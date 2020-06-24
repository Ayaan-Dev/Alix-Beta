const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const { green } = require("../../colours.json");
const { red } = require("../../colours.json");

module.exports = {
    config: {
        name: "withdraw",
        aliases: ["draw"],
        usage: "<amount>",
        category: "Economy",
        description: "",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
       let user = message.author;

      let member = db.fetch(`money_${message.guild.id}_${user.id}`)
      let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`)

      if (args[0] == 'all') {
        let money = await db.fetch(`bank_${message.guild.id}_${user.id}`)

        db.subtract(`bank_${message.guild.id}_${user.id}`, money)
        db.add(`money_${message.guild.id}_${user.id}`, money)
        let embed5 = new Discord.RichEmbed()
      .setColor(green)
      .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
      .setDescription(`<a:verify5500:698222635091230750> You have withdrawn all your coins from your bank`);
      message.channel.send(embed5)

      } else {

      let embed2 = new Discord.RichEmbed()
      .setColor(red)
      .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
      .setDescription(`<a:Crossag:712271469064749066> Specify an amount to withdraw`);

      if (!args[0]) {
          return message.channel.send(embed2)
      }
      let embed3 = new Discord.RichEmbed()
      .setColor(red)
      .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
      .setDescription(`<a:Crossag:712271469064749066> You can't withdraw negative money`);

      if (message.content.includes('-')) { 
          return message.channel.send(embed3)
      }
      let embed4 = new Discord.RichEmbed()
      .setColor(red)
      .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
      .setDescription(`<a:Crossag:712271469064749066> You don't have that much money in the bank`);

      if (member2 < args[0]) {
          return message.channel.send(embed4)
      }

      let embed5 = new Discord.RichEmbed()
      .setColor(green)
      .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
      .setDescription(`<a:verify5500:698222635091230750> You have withdrawn **${args[0]}** coins from your bank`);

      message.channel.send(embed5)
      db.subtract(`bank_${message.guild.id}_${user.id}`, args[0])
      db.add(`money_${message.guild.id}_${user.id}`, args[0])
      }
    }
}