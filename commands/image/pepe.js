const { MessageEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");
const fetch = require('node-fetch');

module.exports = { 
    config: {
        name: "pepe",
        description: "",
        usage: "!!pepe",
        category: "image",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let pepe1 = new MessageEmbed()
        .setColor(cyan)
        .setImage("https://cdn.discordapp.com/emojis/428556352915505165.png?v=1");

        let pepe2 = new MessageEmbed()
        .setColor(cyan)
        .setImage("https://cdn.discordapp.com/emojis/428556326482739230.png?v=1");

        let pepe3 = new MessageEmbed()
        .setColor(cyan)
        .setImage("https://cdn.discordapp.com/emojis/428556486235389973.png?v=1");

        let pepe4 = new MessageEmbed()
        .setColor(cyan)
        .setImage("https://cdn.discordapp.com/emojis/428556308929576960.png?v=1");

        let pepe5 = new MessageEmbed()
        .setColor(cyan)
        .setImage("https://cdn.discordapp.com/emojis/428556295218659329.png?v=1");

        let pepe6 = new MessageEmbed()
        .setColor(cyan)
        .setImage("https://cdn.discordapp.com/emojis/428556467021545473.png?v=1");

        let pepe7 = new MessageEmbed()
        .setColor(cyan)
        .setImage("https://cdn.discordapp.com/emojis/428556448507625474.png?v=1");

        let pepe8 = new MessageEmbed()
        .setColor(cyan)
        .setImage("https://cdn.discordapp.com/emojis/428556377754042378.png?v=1");

        let pepe9 = new MessageEmbed()
        .setColor(cyan)
        .setImage("https://cdn.discordapp.com/emojis/428556281767526405.png?v=1");

        let pepe10 = new MessageEmbed()
        .setColor(cyan)
        .setImage("https://cdn.discordapp.com/emojis/428556266366042112.png?v=1");

        let pepes = [pepe1, pepe2, pepe3, pepe4, pepe5, pepe6, pepe7, pepe8, pepe9, pepe10]

        let dapepe = Math.floor((Math.random() * pepes.length));

        message.channel.send(pepes[dapepe])
    }
}