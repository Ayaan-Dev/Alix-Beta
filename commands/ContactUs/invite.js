const { RichEmbed } = require("discord.js")
const { dark_blue } = require("../../colours.json");
const fetch = require("node-fetch")

module.exports = {
    config: {
        name: "invite",
        aliases: ["inviteme"],
        usage: "",
        category: "ContactUs",
        description: "Use this command to invite me!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        const embed = new RichEmbed()
        .setColor(dark_blue)
        .setAuthor("Links", "https://cdn.discordapp.com/attachments/696417925418057789/715801617508728923/GLITCH_20200529110805.gif")
        .setDescription("[Invite Me](https://discordapp.com/oauth2/authorize?client_id=703819372317114378&scope=bot&permissions=2146958847)\n[Official Discord](https://discord.gg/6nMhnkn)\n[GitHub](https://github.com/ayaan1005)\n[Website](https://ayaangaming.glitch.me)\n[Vote Us](https://top.gg/bot/703819372317114378)")
        .setTimestamp()
        message.channel.send(embed);
    }
}