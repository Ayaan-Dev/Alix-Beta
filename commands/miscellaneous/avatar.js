const { RichEmbed } = require("discord.js")
const { pink } = require("../../colours.json");
const fetch = require("node-fetch")

module.exports = {
    config: {
        name: "avatar",
        aliases: ["av"],
        usage: "!!av",
        category: "miscellaneous",
        description: "Shows your avatar!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        let user = message.mentions.users.first();
        if(!user) user = message.author;
        let color = message.member.displayHexColor;
        if (color == '#fa287c') color = message.member.hoistRole.hexColor;
        const embed = new RichEmbed()
                        .setImage(user.avatarURL)
                        .setColor(pink)
            message.channel.send({embed});
        }
    }