const { RichEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const { stripIndents } = require("common-tags");
const overwatch = require("overwatch-api");

module.exports = {
    config: {
        name: "poll",
        description: "",
        usage: "!!poll",
        category: "Moderation",
        accessableby: "Moderators",
        aliases: ["pl"] 
    }, 
    run: async (bot, message, args) => {
        if (!message.guild.member(bot.user).hasPermission('ADD_REACTIONS')) return message.reply('Sorry, i dont have the perms to do this cmd i need ADD_REACTIONS. :x:')
        const sayMessage = args.join(" ");
       if (sayMessage.length < 1) return message.channel.send("Didnt provide anything for the poll.")
       if (message.member.hasPermission("KICK_MEMBERS")) {
         const embed = new RichEmbed()
         .setColor("RANDOM")
         .setTitle(" Poll ")
         .setDescription(`A poll has begun! The poll is: "**${sayMessage}**"!, vote now!`)
          message.channel.send(embed).then(m => {
              m.react('✅');
              m.react('❌');
             })
        }
    }
}