const { MessageEmbed } = require("discord.js")
let giveMeAJoke = require('give-me-a-joke');;

module.exports = {
    config: {
        name: "joke",
        aliases: ["jk"],
        usage: "!!joke",
        category: "miscellaneous",
        description: "Send joke!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        giveMeAJoke.getRandomDadJoke(function(joke){
            message.channel.send(joke)
        })
    }
}