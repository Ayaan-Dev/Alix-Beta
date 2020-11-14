const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const ms = require("ms");


module.exports.run = async (bot, message, args) => {

if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) {
        const embed2 = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("You Don't Have Permission To Perform This Command!")
      return message.channel.send(embed2)
}

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) {
        const embed8 = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("I Don't Have Permission To Perform This Command!")
      return message.channel.send(embed8)
}

let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!mutee) {
        const embed7 = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("Please Provide Mention A Member To Mute!")
      return message.channel.send(embed7)
}

let reason = args.slice(1).join(" ");
if(!reason) reason = "No reason given"

let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
if(!muterole){
    try{
      muterole = await message.guild.roles.create({
        data: {
        name: "Muted",
        color: "#000000",
        permissions:[]
        }
      })
      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.updateOverwrite(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
}


mutee.roles.add(muterole.id).then(() => {
    message.delete()
    const g = new Discord.MessageEmbed()
  .setDescription("Your punishment has been updated in "+message.guild.name)
  .setTitle(bot.user.username+" Moderation!")
  .addField("Action", "Mute", true)
  .addField("Action ID", mutee.user.id, true)
  .addField("Reason", reason, true)
  .setTimestamp()
    mutee.send(g).catch(e => console.log(mutee.user.username + "Is Not Supporting DMs"))
  const embed11 = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setTitle(bot.user.username+" Moderation!")
  .addField("Action", "Mute", true)
  .addField("Action ID", mutee.user.id, true)
  .addField("Reason", reason, true)
  .setTimestamp()
    message.channel.send(embed11)
})
}


module.exports.config = {
    name: "mute",
    description: "Mutes a member in the discord!",
    usage: "!!mute <@user> <reason>",
    category: "moderation",
    accessableby: "Members",
    aliases: ["nospeak"]
}