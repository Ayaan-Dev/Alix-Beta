const Discord = require("discord.js");
const db = require("quick.db");
const { green } = require("../../colours.json");
const { red } = require("../../colours.json");

module.exports = {
    config: {
        name: "addmoney",
        aliases: ["addm"],
        usage: "<only bot owner>",
        category: "Owner",
        description: "",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
 let ownerID = '597822927198748686'
  if(message.author.id !== ownerID) return;

  let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    db.add(`money_${message.guild.id}_${user.id}`, args[1])
    let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)

    let moneyEmbed = new Discord.RichEmbed()
    .setColor(green)
    .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
    .setDescription(`<a:verify5500:698222635091230750> Added ${args[1]} coins\n\nNew Balance: **${bal}**`);
    message.channel.send(moneyEmbed)

    }
}