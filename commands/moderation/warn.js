const { RichEmbed } = require("discord.js");
const fs = require("fs");

module.exports= {
    config: {
        name: "warn",
        description: "Warns a member in the guild!",
        usage: "<user> <reason>",
        category: "moderation",
        accessableby: "Moderators",
        aliases: ["warn"]
    },
    run: async (bot, message, args) => {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have premission to do that!");
        let reason = args.slice(1).join(' ');
        let user = message.mentions.users.first();
        if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.');
        if (reason.length < 1) return message.reply('You must have a reason for the warning.');
      
        let dmsEmbed = new RichEmbed()
        .setTitle("Warn")
        .setColor("#00ff00")
        .setDescription(`You have been warned on \`${message.guild.name}\``)
        .addField("Warned by", message.author.tag)
        .addField("Reason", reason);
      
        user.send(dmsEmbed);
      
        message.delete();
        
        message.channel.send(`${user.tag} has been warned`)
    }
}