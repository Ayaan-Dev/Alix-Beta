const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const prefix = botconfig.prefix


module.exports.run = async (bot, message, args) => {

     const eembed = new Discord.RichEmbed()
      .setColor('RED')
      .setTitle('**UNDER DEVELOPMENT** <a:loadingag:716132360260812832>')
      .setImage('https://cdn.discordapp.com/attachments/693162955013095494/721292567211147274/avento.gif')
      .setTimestamp()
      return message.channel.send(eembed)
  
    if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to use this command!")

    let KickMember = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!KickMember) return message.channel.send("Please provide a user to kick!")

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "No reason given!"

    if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to do this command!")

    KickMember.send(`Hello, you been kicked from ${message.guild.name} for: ${reason}`).then(() =>
    KickMember.kick()).catch(err => console.log(err))

    message.channel.send(`**${KickMember.user.tag}** has been kicked`)

    let embed = new Discord.RichEmbed()
    .setColor(colours.green)
    .setAuthor(`${message.guild.name} Auditlogs`, message.guild.conURL)
    .addField("Moderation:", "kick")
    .addField("Kicked Member:", KickMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.find(c => c.name === "modlogs")
        if(!sChannel) {
        return message.channel.send("**You don't have a channel with name **`modlogs` **kindly please make a channel called **`modlogs` **to show up all moderation command logs used up in NEFFEX BOT**") 
         }
    sChannel.send(embed)

}

module.exports.config = {
    name: "kick",
    description: "Kick a user from the guild!",
    usage: "!!kick",
    category: "Moderation",
    accessableby: "Moderator",
    aliases: ["kick"]
}