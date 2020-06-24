const db = require("quick.db");
const Discord = require('discord.js');
const { green } = require("../../colours.json");
const { red } = require("../../colours.json");

module.exports = {
    config: {
        name: "storeinfo",
        aliases: ["sti"],
        usage: "<product-name>",
        category: "Economy",
        description: "",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
      if(!args[0]){
        const fgf = new Discord.RichEmbed()
        .setColor(red)
        .setDescription(`Specify a product name to get info.\n\n**bronze,** **nikes,** **car,** **mansion** `)
        return message.channel.send(fgf)
      }
          if (args[0] == 'bronze') {

          let embed = new Discord.RichEmbed()
          .setDescription("**Bronze Rank**\n\nBenefits: Chance to get more coins from robbing someone")
          .setColor(green)
          message.channel.send(embed)
        } else if(args[0] == 'nikes') {
          let embed = new Discord.RichEmbed()
          .setDescription("**Fresh Nikes**\n\nBenefits: Chance to win coins, roles on our Discord Server + More by leading the leaderboard")
          .setColor(green)
          message.channel.send(embed)
        } else if(args[0] == 'car') {
          let embed = new Discord.RichEmbed()
          .setDescription("**Car**\n\nBenefits: Chance to win coins, roles on our Discord Server + More by leading the leaderboard")
          .setColor(green)
          message.channel.send(embed)
      } else if(args[0] == 'mansion') {
        let embed = new Discord.RichEmbed()
        .setDescription("**Mansion**\n\nBenefits: Chance to win coins, roles on our Discord Server + More by leading the leaderboard")
        .setColor(green)
        message.channel.send(embed)
        } else if(args[0] == 'nickname') {
        let embed = new Discord.RichEmbed()
        .setDescription("**NickName**\n\nBenefits: Change nickname in the server!")
        .setColor(green)
        message.channel.send(embed)
      }
    }
}