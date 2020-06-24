const { RichEmbed } = require("discord.js")
const { light_blue } = require("../../colours.json");
const fetch = require("node-fetch")

module.exports = {
    config: {
        name: "holdhand",
        aliases: ["hh"],
        usage: "",
        category: "Image",
        description: "Gives holdhand to the user you have mentioned!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        if (message.mentions.users.size < 1) return message.channel.send("you can't hold hands with nobody")
      let user = message.guild.member(message.mentions.users.first());
            message.channel.send(`${user} You held hands with ${message.author.username} ❤`,{
                embed: {
                    image: {
                        url: "https://media.giphy.com/media/TnUJHKyjwHXOM/giphy.gif"
                    }
                }
            })
    }
}