const Discord = require("discord.js")
const eco = require("discord-economy");

module.exports = {
    config: {
        name: "leaderboard",
        aliases: ["lb"],
        usage: "!!leaderboard",
        category: "economy",
        description: "Checks your rank in economy!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        if (message.mentions.users.first()) {
 
            var output = await eco.Leaderboard({
              filter: x => x.balance > 50,
              search: message.mentions.users.first().id
            })
            message.channel.send(`The user **${message.mentions.users.first().tag}** is number **${output}** on my leaderboard!`);
       
          } else {
       
            eco.Leaderboard({
              limit: 3, //Only takes top 3 ( Totally Optional )
              filter: x => x.balance > 50 //Only allows people with more than 100 balance ( Totally Optional )
            }).then(async users => { //make sure it is async
       
              if (users[0]) var firstplace = await bot.fetchUser(users[0].userid) //Searches for the user object in discord for first place
              if (users[1]) var secondplace = await bot.fetchUser(users[1].userid) //Searches for the user object in discord for second place
              if (users[2]) var thirdplace = await bot.fetchUser(users[2].userid) //Searches for the user object in discord for third place
       
              message.channel.send(`***My leaderboard:***

*1* - **${firstplace && firstplace.tag || 'Nobody Yet'} : Rs ${users[0] && users[0].balance || '0'}**
*2* - **${secondplace && secondplace.tag || 'Nobody Yet'} : Rs ${users[1] && users[1].balance || '0'}**
*3* - **${thirdplace && thirdplace.tag || 'Nobody Yet'} : Rs ${users[2] && users[2].balance || '0'}**`)
       
            })
       
          }
    }
}