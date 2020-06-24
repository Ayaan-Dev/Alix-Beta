const { RichEmbed } = require("discord.js")
const { light_blue } = require("../../colours.json");
const fetch = require("node-fetch")

module.exports = {
    config: {
        name: "highfive",
        aliases: ["hf"],
        usage: "",
        category: "Image",
        description: "Gives highfive to the user you have mentioned!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        if (message.mentions.users.size < 1) return message.channel.send("you can't high-five nobody")
      let user = message.guild.member(message.mentions.users.first());
            message.channel.send(`${user} You got a high-five from ${message.author.username} ❤`,{
                embed: {
                    image: {
                        url: "https://i.imgur.com/7BJ6gfM.gif"
                    }
                }
            })
    }
}