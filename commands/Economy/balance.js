const Discord = require("discord.js");
const db = require("quick.db");
const { green } = require("../../colours.json");

module.exports = {
    config: {
        name: "balance",
        aliases: ["bal"],
        usage: "",
        category: "Economy",
        description: "Checks you blance!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
          let user = message.mentions.members.first() || message.author;

    let bal = db.fetch(`money_${message.guild.id}_${user.id}`)

    if (bal === null) bal = 0;

    let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`)
    if (bank === null) bank = 0;

    let moneyEmbed = new Discord.RichEmbed()
    .setColor(green)
    .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
    .setDescription(`**${user}'s Balance**`)
    .addField(`Pocket`, `**${bal}**`, true)
    .addField(`Bank`, `**${bank}**`, true)
    message.channel.send(moneyEmbed)    }
}