const { RichEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const { stripIndents } = require("common-tags");
const overwatch = require("overwatch-api");
const { green } = require("../../colours.json");
const { red } = require("../../colours.json");

module.exports = {
    config: {
        name: "choose",
        description: "",
        usage: "<two option>",
        category: "Games",
        accessableby: "Members",
        aliases: ["select"] 
    }, 
    run: async (bot, message, args) => {
        const choice1 = args[0]
        const choice2 = args.slice(1).join(" ")
        if (choice2 < 1) {
            const embed = new RichEmbed()
            .setColor(red)
            .setDescription(`**Didnt provide a second option to choose from.**`)
            return message.channel.send(embed)
        }
        var choices = [`${choice1}`, `${choice2}`]
        const DFD = new RichEmbed()
        .setColor(green)
        .setDescription(`**I choose ${choices[Math.floor(Math.random() * choices.length)]}!**`)
        message.channel.send(DFD);
    }
}