const Discord = require("discord.js")
const eco = require("discord-economy");

module.exports = {
    config: {
        name: "transfer",
        aliases: ["dell"],
        usage: "<amount>",
        category: "economy",
        description: "Transfer money to your friend!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        var user = message.mentions.users.first()
        var amount = args[1]
    
        if (!user) return message.reply('Mention the user you want to send money to!')
        if (!amount) return message.reply('Specify the amount you want to pay!')
    
        var output = await eco.FetchBalance(message.author.id)
        if (output.balance < amount) return message.reply('You have fewer coins than the amount you want to transfer!')
    
        var transfer = await eco.Transfer(message.author.id, user.id, amount)
        message.reply(`Transfering coins successfully done!\nBalance from **${message.author.tag}**: Rs **${transfer.FromUser}**\nBalance from **${user.tag}**: Rs **${transfer.ToUser}**`);
    }
}