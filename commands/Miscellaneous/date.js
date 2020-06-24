const { RichEmbed } = require("discord.js");
const colours = require("../../colours.json");

module.exports = {
  config: {
    name: "date",
    aliases: ["date"],
    usage: "",
    category: "Miscellaneous",
    description: "Send the date",
    accessableby: "Members"
  },
  run: async (bot, message, args) => {
    let date = new Date();

    let day = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let days = day[date.getDay()];

    let month = [
      "Januari",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let months = month[date.getMonth()];

    const embed = new RichEmbed()
      .setColor(colours.green)
      .setDescription(
        `Today: \`${days}, ${months}/${date.getDate()}/${date.getFullYear()}\``
      );
    message.channel.send(embed);
  }
};
