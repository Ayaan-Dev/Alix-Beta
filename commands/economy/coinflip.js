const Discord = require("discord.js")
const eco = require("discord-economy");

module.exports = {
    config: {
        name: "coinflip",
        aliases: ["cf"],
        usage: "!!coinflip",
        category: "economy",
        description: "Coinflip depend on your luck play and win balance in economy!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        var flip = args[0] //Heads or Tails
        var amount = args[1] //Coins to gamble
     
        if (!flip || !['heads', 'tails'].includes(flip)) return message.reply('Please specify the flip, either heads or tails!')
        if (!amount) return message.reply('Specify the amount you want to gamble!')
     
        var output = await eco.FetchBalance(message.author.id)
        if (output.balance < amount) return message.reply('You have fewer coins than the amount you want to gamble!')
     
        var gamble = await eco.Coinflip(message.author.id, flip, amount).catch(console.error)
        message.reply(`You **${gamble.output}**! New balance: Rs **${gamble.newbalance}**`)
    }
}