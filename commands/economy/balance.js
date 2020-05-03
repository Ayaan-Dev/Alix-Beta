const Discord = require("discord.js")
const eco = require("discord-economy");

module.exports = {
    config: {
        name: "balance",
        aliases: ["bal"],
        usage: "!!balance",
        category: "economy",
        description: "Checks you blance!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        var output = await eco.FetchBalance(message.author.id)
        message.channel.send(`Hey **${message.author.tag}**! You own Rs **${output.balance}**.`);
    }
}