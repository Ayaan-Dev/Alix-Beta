const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "kill",
        aliases: ["kill"],
        usage: "!!kill",
        category: "games",
        description: "",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        let killed = message.mentions.members.first();
        if(!killed) {

        let emb = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`${message.author} decied to kill themself 💔 REST IN PEACE`)

        message.channel.send(emb)

        } else {

        let emb = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`${killed} was killed by ${message.author} 💔 REST IN PEACE`)

        message.channel.send(emb)
        }
    }
}