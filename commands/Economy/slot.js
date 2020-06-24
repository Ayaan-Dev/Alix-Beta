const slotItems = ["<:Grape:618765748940177421>", "<:Watermelon:618765904318038027>", "<:Orange:618765805596835880>", "<:Apple:618765871862513695>", "<:7_:618765717499805706>", "<:Strawberry:618765828929617930>", "<:Cherry:618765778094784513>"];
const db = require("quick.db");
const Discord = require('discord.js');
const { green } = require("../../colours.json");
const { red } = require("../../colours.json");

module.exports = {
    config: {
        name: "slot",
        aliases: ["slot"],
        usage: "",
        category: "Economy",
        description: "",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
      let user = message.author;
    let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`)
    let money = parseInt(args[0]);
    let win = false;

    let moneymore = new Discord.RichEmbed()
    .setColor(red)
    .setDescription(`<a:Crossag:712271469064749066> You are betting more than you have`);

    let moneyhelp = new Discord.RichEmbed()
    .setColor(red)
    .setDescription(`<a:Crossag:712271469064749066> Specify an amount`);

    if (!money) return message.channel.send(moneyhelp);
    if (money > moneydb) return message.channel.send(moneymore);

    let number = []
    for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2]) { 
        money *= 9
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        money *= 2
        win = true;
    }
    if (win) {
        let slotsEmbed1 = new Discord.RichEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won ${money} coins`)
            .setColor(green)
        message.channel.send(slotsEmbed1)
        db.add(`money_${message.guild.id}_${user.id}`, money)
    } else {
        let slotsEmbed = new Discord.RichEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${money} coins`)
            .setColor(red)
        message.channel.send(slotsEmbed)
        db.subtract(`money_${message.guild.id}_${user.id}`, money)
    }

    }
}