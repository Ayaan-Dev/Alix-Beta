const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const prefix = botconfig.prefix


module.exports.run = async (bot, message, args) => {

    message.channel.send("Pinging...").then(m => {
        let ping = m.createdTimestamp - message.createdTimestamp
        let choices = ["***:ping_pong: Is this really my ping***", "***:ping_pong: Is it okay? I cant look***", "***:ping_pong: I hope it isnt bad***"]
        let response = choices[Math.floor(Math.random() * choices.length)]

        m.edit(`${response}:\n**Bot Latency:** \`${ping}\`,\n**API Latency:** \`${Math.round(bot.ping)}\``)
    })

}


module.exports.config = {
    name: "ping",
    description: "PONG! Displays the api & latency",
    usage: "!!ping",
    category: "miscellaneous",
    accessableby: "Members",
    aliases: ["latency"]
}
