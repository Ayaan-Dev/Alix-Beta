const { RichEmbed } = require("discord.js")
let giveMeAJoke = require('give-me-a-joke');;

module.exports = {
    config: {
        name: "cnjoke",
        aliases: ["cnjk"],
        usage: "!!cnjoke",
        category: "miscellaneous",
        description: "Send joke!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        giveMeAJoke.getRandomCNJoke(function(joke){
            message.channel.send(joke)
        })
    }
}