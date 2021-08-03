const { MessageEmbed } = require("discord.js");
const { prefix, support_server } = require("../../botconfig.json");
const { readdirSync } = require("fs")
const { stripIndents } = require("common-tags")
const { red } = require("../../colours.json")

module.exports = {
    config: {
        name: "help",
        aliases: ["halp", "commands"],
        usage: "(command)",
        category: "miscellaneous",
        description: "Displays all commands that the bot has.",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        const embed = new MessageEmbed()
            .setColor(red)
            .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL())
            .setThumbnail(bot.user.displayAvatarURL())
            .setImage('https://cdn.discordapp.com/attachments/632098744262721564/633640689955110912/nitro.gif')

        if(!args[0]) {
            const categories = readdirSync("./commands/")

            embed.setDescription(`These are the avaliable commands for ${message.guild.me.displayName}\nThe bot prefix is: **${prefix}**`)
            embed.setFooter(`Make Sure To Use The Prefix Before The Commands. PREFIX Is ${prefix}. If You Find Any Bug, Feel Free To Report Them Using !!contact <bug>`);

            categories.forEach(category => {
                const dir = bot.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    embed.addField(`❯ ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(" "));
                } catch(e) {
                    console.log(e)
                }
            })

            embed.addField("❯ Support Us:", `[Support Server](${support_server}) | [Bot Invite](https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=8)`)

            return message.channel.send(embed)
        } else {
            let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!command) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${prefix}help\` for the list of the commands.`))
            command = command.config

            embed.setDescription(stripIndents`The bot's prefix is: \`${prefix}\`\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || "No Description provided."}
            **Usage:** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "No Usage"}
            **Accessible by:** ${command.accessableby || "Members"}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}`)

            embed.addField("❯ Support Us:", `[Support Server](${support_server}) | [Bot Invite](https://discordapp.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=8)`)

            return message.channel.send(embed)
        }
    }
}