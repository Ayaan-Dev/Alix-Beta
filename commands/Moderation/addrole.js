const { RichEmbed } = require("discord.js")
const { redlight } = require("../../colours.json")
const { green } = require("../../colours.json")

module.exports= {
    config: {
        name: "addrole",
        description: "Adds a role to a member of the guild!",
        usage: "!!addrole",
        category: "Moderation",
        accessableby: "Moderators",
        aliases: ["ar", "roleadd"]
    },
    run: async (bot, message, args) => {

    if(!message.member.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")

    let rMember = message.mentions.members.first() || message.guild.members.find(m => m.user.tag === args[0]) || message.guild.members.get(args[0])
    if(!rMember) return message.channel.send("Please provide a user to add a role too.")
    let role = message.guild.roles.find(r => r.name == args[1]) || message.guild.roles.find(r => r.id == args[1]) || message.mentions.roles.first()
    if(!role) return message.channel.send("Please provide a role to add to said user.") 
    let reason = args.slice(2).join(" ")
    if(!reason) return message.channel.send("Please provide a reason")

    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to perform this command.")

    if(rMember.roles.has(role.id)) {
        const ffgd = new RichEmbed()
        .setColor(green)
        .setDescription(`${rMember.displayName}, already has the role!`)
        return message.channel.send(ffgd)
    } else {
        await rMember.addRole(role.id).catch(e => console.log(e.message))
        const ebafd = new RichEmbed()
        .setColor(green)
        .setDescription(`The role, ${role.name}, has been added to ${rMember.displayName}.`)
        message.channel.send(ebafd)
    }

    let embed = new RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "Addrole")
    .addField("Mutee:", rMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())
    
        let sChannel = message.guild.channels.find(c => c.name === "modlogs")
         if(!sChannel) {
        return message.channel.send("**You don't have a channel with name **`modlogs` **kindly please make a channel called **`modlogs` **to show up all moderation command logs used up in NEFFEX BOT**") 
         }
        sChannel.send(embed)
    }
}