const Discord = require('discord.js');
const db = require('quick.db');
const colours = require('../../colours.json')

module.exports= {
    config: {
        name: "profile",
        description: "Check your profile in the database",
        usage: "!!profile",
        category: "XP&LEVEL",
        accessableby: "Members",
        aliases: ["pf"]
    },
    run: async (bot, message, args) => {
      let messagefetch = db.fetch(`messages_${message.guild.id}_${message.author.id}`)
    let levelfetch = db.fetch(`level_${message.guild.id}_${message.author.id}`)

    if(messagefetch == null) messagefetch = '0';
    if(levelfetch == null) levelfetch = '0';

let embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.guild.iconURL)
    .setColor("#ff2050")
    .setThumbnail(message.author.displayAvatarURL)
    .setDescription(`**LEVEL** - ${levelfetch}
**Message Sent** - ${messagefetch}`)
    
 message.channel.send(embed)  
    }
}