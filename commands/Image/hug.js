const { RichEmbed } = require("discord.js")
const { light_blue } = require("../../colours.json");
const fetch = require("node-fetch")

module.exports = {
    config: {
        name: "hug",
        aliases: ["hug"],
        usage: "",
        category: "Image",
        description: "Gives hug to the user you have mentioned!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {

        fetch('https://nekos.life/api/hug')
        .then(res => res.json()).then(body => {


        if(!body) return message.channel.send("I broke! Try again.")

            let cEmbed = new RichEmbed()
            .setColor("RANDOM")
            .setImage(body.url)

            message.channel.send(cEmbed)

        })
    }
}