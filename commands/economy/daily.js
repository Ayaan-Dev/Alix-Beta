const Discord = require("discord.js")
const eco = require("discord-economy");

module.exports = {
    config: {
        name: "daily",
        aliases: ["dailyy"],
        usage: "!!daily",
        category: "economy",
        description: "Checks in daily to claim reward!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        var output = await eco.Daily(message.author.id)
        //output.updated will tell you if the user already claimed his/her daily yes or no.
     
        if (output.updated) {
     
          var profile = await eco.AddToBalance(message.author.id, 150)
          message.reply(`You claimed your daily coins successfully! You now own Rs ${profile.newbalance}.`);
     
        } else {
          message.channel.send(`Sorry, you already claimed your daily coins!\nBut no worries, over **${output.timetowait}** you can claim your daily reward again!`)
        }
    }
}