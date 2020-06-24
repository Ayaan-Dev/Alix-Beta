const { RichEmbed } = require("discord.js");
let giveMeAJoke = require("give-me-a-joke");
const { green } = require("../../colours.json");
const { red } = require("../../colours.json");

module.exports = {
  config: {
    name: "cnjoke",
    aliases: ["cnjk"],
    usage: "",
    category: "Miscellaneous",
    description: "Send joke!",
    accessableby: "Members"
  },
  run: async (bot, message, args) => {
    giveMeAJoke.getRandomCNJoke(function(joke) {
      const he = new RichEmbed().setColor(green).setDescription(joke);
      message.channel.send(he);
    });
  }
};
