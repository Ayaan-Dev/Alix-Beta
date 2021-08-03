const { MessageEmbed } = require("discord.js")
const { light_blue } = require("../../colours.json");
const fetch = require("node-fetch")

module.exports = {
    config: {
        name: "dog",
        aliases: ["dogs"],
        usage: "!!cat",
        category: "image",
        description: "Shows a cute pictures of dog!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        let msg = await message.channel.send("Generating...")

        fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json()).then(body => {


        if(!body) return message.channel.send("I broke! Try again.")

            let cEmbed = new MessageEmbed()
            .setColor(light_blue)
            .setAuthor(`${bot.user.username.toUpperCase()} Dogs!`, message.guild.iconURL())
            .setImage(body.message)
            .setTimestamp()
            .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL())

            message.channel.send(cEmbed)

            msg.delete();
        })
    }
}