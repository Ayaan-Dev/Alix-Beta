const { RichEmbed } = require("discord.js");
const { version } = require("../../botconfig.json");

module.exports = {
  config: {
    name: "botinfo",
    aliases: ["bi"],
    usage: "",
    category: "Miscellaneous",
    description: "Shows the bot info!",
    accessableby: "Members"
  },
  run: async (bot, message, args) => {
    let inline = true;
    let bicon = bot.user.displayAvatarURL;
    let usersize = bot.users.size;
    let chansize = bot.channels.size;
    let uptimxd = bot.uptime;
    let servsize = bot.guilds.size;
    let botembed = new RichEmbed()
      .setColor("#00ff00")
      .setThumbnail(bicon)
      .addField("Bot Name", `${bot.user.username}`, inline)
      .addField("Bot Owner", "<@597822927198748686>", inline)
      .addField("Servers", `${servsize}`, inline)
      .addField("Channels", `${chansize}`, inline)
      .addField("Users", `${usersize}`, inline)
      .addField("Bot Library", "Discord.js", inline)
      .addField("Version", `2.0.0`)
      .addField("Created On", bot.user.createdAt)
      .setFooter(`Information about: ${bot.user.username}. Developed by: Ayaan`)
      .setTimestamp();

    message.channel.send(botembed);
  }
};
