const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) {
    const embed2 = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("You Don't Have Permission To Perform This Command!");
    return message.channel.send(embed2);
  }

  if (!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) {
    const embed8 = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("I Don't Have Permission To Perform This Command!");
    return message.channel.send(embed8);
  }

  let mutee =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
  if (!mutee) {
    const embed3 = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("Please Supply A User To Be Unmuted!");
    return message.channel.send(embed3);
  }

  let reason = args.slice(1).join(" ");
  if (!reason) reason = "No reason given";

  let muterole = message.guild.roles.cache.find(r => r.name === "Muted");
  if (!muterole) {
    const embed4 = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("There Is No Muted Role To Remove!");
    return message.channel.send(embed4);
  }

  mutee.roles.remove(muterole.id).then(() => {
    message.delete();
    const g = new Discord.MessageEmbed()
      .setDescription(
        "Your punishment has been updated in " + message.guild.name
      )
      .setTitle(bot.user.username + " Moderation!")
      .addField("Action", "Unmute", true)
      .addField("Reason", reason, true)
      .setFooter(message.createdAt.toLocaleString());
    mutee
      .send(g)
      .catch(e => console.log(mutee.user.username + "Is Not Supporting DMs"));
    const embed11 = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle(bot.user.username + " Moderation!")
      .addField("Action", "Unmute", true)
      .addField("Reason", reason, true)
      .setFooter(message.createdAt.toLocaleString());
    message.channel.send(embed11);
  });
};

module.exports.config = {
  name: "unmute",
  description: "Unmutes a member in the discord!",
  usage: "<user> <reason>",
  accessableby: "Members",
  category: "moderation",
  aliases: ["unm", "speak"]
};
