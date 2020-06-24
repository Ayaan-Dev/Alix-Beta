const Discord = require("discord.js")
const { pink } = require("../../colours.json");
const db = require("quick.db")

module.exports = {
    config: {
        name: "setwelcome",
        aliases: ["swelcome"],
        usage: "<mention_channel>",
        category: "Setup",
        description: "Setup's welcome message of the guild",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
      let channel = message.mentions.channels.first()
    
    if(!channel) {
      return message.channel.send("Please Mention the channel first")
    }
    
    //Now we gonna use quick.db
    
    db.set(`welchannel_${message.guild.id}`, channel.id)
    
    message.channel.send(`Welcome Channel is seted as ${channel}`)
    }
}