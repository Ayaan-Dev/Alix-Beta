const { RichEmbed } = require("discord.js")
const { red } = require("../../colours.json");
const fetch = require("node-fetch")

module.exports = {
    config: {
        name: "roleinfo",
        aliases: ["ri"],
        usage: "",
        category: "Miscellaneous",
        description: "Shows the info of the role!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        let inline = true

        let role = args.join(` `)
        if(!role) return message.reply("Specify a role!");
        let gRole = message.guild.roles.find(`name`, role);
        if(!gRole) return message.reply("Couldn't find that role.");

        const status = {
            false: "No",
            true: "Yes"
        }

        let roleemebed = new RichEmbed()
        .setColor(red)
        .addField("ID", gRole.id, inline )
        .addField("Name", gRole.name, inline)
        .addField("Mention", `\`<@${gRole.id}>\``, inline)
        .addField("Hex", gRole.hexColor, inline)
        .addField("Members", gRole.members.size, inline)
        .addField("Position", gRole.position, inline)
        .addField("Hoisted", status[gRole.hoist], inline)
        .addField("Mentionable", status[gRole.mentionable], inline)
        .addField("Managed", status[gRole.managed], inline)
        
        message.channel.send(roleemebed);
    }
}