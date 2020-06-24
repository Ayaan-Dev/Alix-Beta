const { RichEmbed } = require("discord.js")
const { light_blue } = require("../../colours.json");
const fetch = require("node-fetch")

module.exports = {
    config: {
        name: "cat",
        aliases: ["cats"],
        usage: "",
        category: "Image",
        description: "Shows a cute pictures of cat!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        let msg = await message.channel.send("Loading <a:loadingag:716132360260812832>")

        fetch('http://aws.random.cat/meow')
        .then(res => res.json()).then(body => {


        if(!body) return message.channel.send("I broke! Try again.")

            let cEmbed = new RichEmbed()
            .setColor(light_blue)
            .setAuthor(`${bot.user.username.toUpperCase()} Cats!`, message.guild.iconURL)
            .setImage(body.file)
            .setTimestamp()
            .setFooter(bot.user.username.toUpperCase(), bot.user.displayAvatarURL)

            message.channel.send(cEmbed)

            msg.delete();
        })
    }
}