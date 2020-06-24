const db = require("quick.db");
const Discord = require('discord.js');
const { green } = require("../../colours.json");
const { red } = require("../../colours.json");

module.exports = {
    config: {
        name: "store",
        aliases: ["shop"],
        usage: "",
        category: "Economy",
        description: "",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
          let embed = new Discord.RichEmbed()
          .setDescription("**VIP Ranks**\n\nBronze: 3500 Coins [!!buy bronze]\n\n**Lifestyle Items**\n\nFresh Nikes: 600 [!!buy nikes]\nCar: 800 [!!buy car]\nMansion: 1200 [!!buy mansion]\nChange NickName: 200 [!!buy nickname]")
          .setColor(green)
          .addField("**Exchange Offer Is Goin On AYAAN GAMING Server**", "[JOIN HERE](https://discord.gg/6nMhnkn)")
          message.channel.send(embed)
    }
}