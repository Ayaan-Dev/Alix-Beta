const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("parse-ms");
const { green } = require("../../colours.json");
const { red } = require("../../colours.json");

module.exports = {
    config: {
        name: "daily",
        aliases: ["dailyy"],
        usage: "",
        category: "Economy",
        description: "Checks in daily to claim reward!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        let user = message.author;

      let timeout = 86400000;
      let amount = 500;

      let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);

      if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));

        let timeEmbed = new Discord.RichEmbed()
        .setColor(red)
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
        .setDescription(`<a:Crossag:712271469064749066> You've already collected your daily reward\n\nCollect it again in **${time.hours}h ${time.minutes}m ${time.seconds}s** `);
        message.channel.send(timeEmbed)
      } else {
        let moneyEmbed = new Discord.RichEmbed()
      .setColor(green)
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
      .setDescription(`<a:verify5500:698222635091230750> You've collected your daily reward of **${amount}** coins`);
      message.channel.send(moneyEmbed)
      db.add(`money_${message.guild.id}_${user.id}`, amount)
      db.set(`daily_${message.guild.id}_${user.id}`, Date.now())


  }
    }
}

