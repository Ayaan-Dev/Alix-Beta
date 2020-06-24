const yoMamma = require('yo-mamma').default;
const { RichEmbed } = require("discord.js");
const { green } = require("../../colours.json");
const { red } = require("../../colours.json");

module.exports = {
    config: {
        name: "yomamma",
        aliases: ["ym"],
        usage: "",
        category: "Games",
        description: "",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        
    let insult = yoMamma();

    const mamma = new RichEmbed()
    .setColor(green)
    .setDescription(insult)
    message.channel.send(mamma)
    }
}