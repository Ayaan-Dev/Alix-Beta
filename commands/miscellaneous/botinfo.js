const { MessageEmbed } = require("discord.js")
const { main_ownerid } = require("../../botconfig")

module.exports = {
    config: {
        name: "botinfo",
        aliases: ["bi"],
        usage: "!!botinfo",
        category: "miscellaneous",
        description: "Shows the bot info!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        let inline = true
        let bicon = bot.user.displayAvatarURL();
        let usersize = bot.users.cache.size
        let chansize = bot.channels.cache.size
        let uptimxd = bot.uptime 
        let servsize = bot.guilds.cache.size
        let botembed = new MessageEmbed()
        .setColor("#00ff00")
        .setThumbnail(bicon)
        .addField("Bot Name", `${bot.user.username}`, inline)
        .addField("Bot Owner", bot.users.cache.get(main_ownerid).tag, inline )
        .addField("Servers", `${servsize}`, inline)
        .addField("Channels", `${chansize}`, inline)
        .addField("Users", `${usersize}`, inline)
        .addField("Bot Library", "Discord.js", inline)
        .addField("Created On", bot.user.createdAt)
        .setFooter(`Information about: ${bot.user.username}. Developed by: ${bot.users.cache.get(main_ownerid).username}`)
        .setTimestamp()
        
        message.channel.send(botembed);
    }
}