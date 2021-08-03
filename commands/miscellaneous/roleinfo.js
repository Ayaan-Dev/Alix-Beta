const { MessageEmbed } = require("discord.js")
const { red } = require("../../colours.json");
const fetch = require("node-fetch")

module.exports = {
    config: {
        name: "roleinfo",
        aliases: ["ri"],
        usage: "!!roleinfo",
        category: "miscellaneous",
        description: "Shows the info of the role!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        let inline = true

        let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
        if(!role) return message.reply("Specify a role!");

        const status = {
            false: "No",
            true: "Yes"
        }

        let roleemebed = new MessageEmbed()
        .setColor(role.hexColor)
        .addField("ID", role.id, inline )
        .addField("Name", role.name, inline)
        .addField("Mention", `\`<@${role.id}>\``, inline)
        .addField("Hex", role.hexColor, inline)
        .addField("Members", role.members.size, inline)
        .addField("Position", role.position, inline)
        .addField("Hoisted", status[role.hoist], inline)
        .addField("Mentionable", status[role.mentionable], inline)
        .addField("Managed", status[role.managed], inline)
        
        message.channel.send(roleemebed);
    }
}