const Discord = require("discord.js")
const { pink } = require("../../colours.json");
const db = require("quick.db")

module.exports = {
    config: {
        name: "setleave",
        aliases: ["sleave"],
        usage: "<mention_channel>",
        category: "Setup",
        description: "Setup's leave message of the guild",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
          let channel = message.mentions.channels.first()
    
    if(!channel) {
      return message.channel.send("Please Mention the channel first")
    }
    
    //Now we gonna use quick.db
    
    db.set(`leavechannel_${message.guild.id}`, channel.id)
    
    message.channel.send(`Leave Channel is seted as ${channel}`)
    }
}