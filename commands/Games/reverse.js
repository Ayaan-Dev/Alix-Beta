const { RichEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const { stripIndents } = require("common-tags");
const overwatch = require("overwatch-api");
const { green } = require("../../colours.json");
const { red } = require("../../colours.json");

module.exports = {
    config: {
        name: "reverse",
        aliases: ["rvc"],
        usage: "<word>",
        category: "Games",
        description: "Reverse the word you have given!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        if (args.length < 1) {
            const embed = new RichEmbed()
            .setColor(red)
            .setDescription(`**You must input text to be reversed!**`)
        }
        const ff = new RichEmbed()
        .setColor(green)
        .setDescription(args.join(' ').split('').reverse().join(''))
        message.channel.send(ff)
    }
}