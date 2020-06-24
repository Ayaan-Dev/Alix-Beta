const Discord = require("discord.js");
const db = require("quick.db");
const { green } = require("../../colours.json");
const { red } = require("../../colours.json");

module.exports = {
    config: {
        name: "removemoney",
        aliases: ["rem"],
        usage: "<amount>",
        category: "Economy",
        description: "",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
  if (!message.member.hasPermission(["MANAGE_SERVER", "ADMINISTRATOR"])) {
    const gaga = new Discord.RichEmbed()
    .setColor(red)
    .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
    .setDescription(`You dont have permission to add money`)
      return message.channel.send(gaga);
  }
      let user = message.mentions.members.first() || message.author;

    if (isNaN(args[1])) return;
    db.subtract(`money_${message.guild.id}_${user.id}`, args[1])
    let bal = await db.fetch(`money_${message.guild.id}_${user.id}`)

    let moneyEmbed = new Discord.RichEmbed()
    .setColor(green)
    .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
    .setDescription(`<a:verify5500:698222635091230750> Removed **${args[1]}** coins\n\nNew Balance: **${bal}**`);
    message.channel.send(moneyEmbed)
}
}