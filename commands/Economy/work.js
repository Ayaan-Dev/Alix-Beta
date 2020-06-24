const db = require('quick.db')
const Discord = require('discord.js')
const ms = require("parse-ms");
const { green } = require("../../colours.json");
const { red } = require("../../colours.json");

module.exports = {
    config: {
        name: "work",
        aliases: ["job"],
        usage: "",
        category: "Economy",
        description: "Find your work to earn money in economy!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
         let user = message.author;
    let author = await db.fetch(`work_${message.guild.id}_${user.id}`)

    let timeout = 600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        let time = ms(timeout - (Date.now() - author));
    
        let timeEmbed = new Discord.RichEmbed()
        .setColor(red)
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
        .setDescription(`<a:Crossag:712271469064749066> You have already worked recently\n\nTry again in **${time.minutes}m ${time.seconds}s** `);
        message.channel.send(timeEmbed)
      } else {

        let replies = ['Programmer','Builder','Waiter','Busboy','Chief','Mechanic']

        let result = Math.floor((Math.random() * replies.length));
        let amount = Math.floor(Math.random() * 80) + 1;
        let embed1 = new Discord.RichEmbed()
        .setColor(green)
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
        .setDescription(`<a:verify5500:698222635091230750> You worked as a ${replies[result]} and earned ${amount} coins`);
        message.channel.send(embed1)
        
        db.add(`money_${message.guild.id}_${user.id}`, amount)
        db.set(`work_${message.guild.id}_${user.id}`, Date.now())
    };
    }
}