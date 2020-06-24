const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const { green } = require("../../colours.json");
const { red } = require("../../colours.json");

module.exports = {
    config: {
        name: "pay",
        aliases: ["pay"],
        usage: "<amount>",
        category: "Economy",
        description: "Transfer money to your friend!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
              let user = message.mentions.members.first() 

      let member = db.fetch(`money_${message.guild.id}_${message.author.id}`)

      let embed1 = new Discord.RichEmbed()
      .setColor(red)
      .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
      .setDescription(`<a:Crossag:712271469064749066> Mention someone to pay`);

      if (!user) {
          return message.channel.send(embed1)
      }
      let embed2 = new Discord.RichEmbed()
      .setColor(red)
      .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
      .setDescription(`<a:Crossag:712271469064749066> Specify an amount to pay`);

      if (!args[1]) {
          return message.channel.send(embed2)
      }
      let embed3 = new Discord.RichEmbed()
      .setColor(red)
      .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
      .setDescription(`<a:Crossag:712271469064749066> You can't pay someone negative money`);

      if (message.content.includes('-')) { 
          return message.channel.send(embed3)
      }
      let embed4 = new Discord.RichEmbed()
      .setColor(red)
      .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
      .setDescription(`<a:Crossag:712271469064749066> You don't have that much money`);

      if (member < args[1]) {
          return message.channel.send(embed4)
      }

      let embed5 = new Discord.RichEmbed()
      .setColor(green)
      .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
      .setDescription(`<a:verify5500:698222635091230750> You have payed ${user.user.username} ${args[1]} coins`);

      message.channel.send(embed5)
      db.add(`money_${message.guild.id}_${user.id}`, args[1])
      db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1])

    }
}