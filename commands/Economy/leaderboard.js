const Discord = require("discord.js");
const db = require("quick.db");
const { green } = require("../../colours.json");
const { red } = require("../../colours.json");
const { loading } = require("../../emoji.json");

module.exports = {
  config: {
    name: "leaderboard",
    aliases: ["lb"],
    usage: "",
    category: "Economy",
    description: "Checks your rank in economy!",
    accessableby: "Members"
  },
  run: async (bot, message, args) => {
     const ffembed = new Discord.RichEmbed()
      .setColor('RED')
      .setTitle('**UNDER DEVELOPMENT** <a:loadingag:716132360260812832>')
      .setImage('https://cdn.discordapp.com/attachments/693162955013095494/721292567211147274/avento.gif')
      .setTimestamp()
      return message.channel.send(ffembed)

    let m = await message.channel.send(
      "Just a moment <a:loadingag:716132360260812832>"
    );
    var economyin = db.all(); // Get all db items
    var economyout = []; // Create an empty array for values to be filtered

    for (var item in economyin) {
      if (item.id.startsWith(`bank_${message.guild.id}_`)) {
        // Grab only bank items for the message guild
        economyout.push(item); // Push that item to our filtered economy array
      }
    }

    if (!economyout[0])
      return m.edit(
        "I can't find any leaderboard info for this server."
      );

    // This economy command will only work for coins but i can make other commands for other things if you want

    var userbals = []; // Create blank array for comparing usernames and balances

    for (var user in economyout) {
      // TODO: Get Usernames and Tags from IDs
      let username = message.guild.members.get(user.id).tag; // Get the username from the ID
      userbals.push({ username: username, data: user.json }); // Push the original data with the username to an object
    }

    // Next we'll need to sort the data by balance
    function dynamicsort(property, order) {
      if (order === "asc") var sort_order = 1;
      else if (order === "desc") sort_order = -1;
      else throw Error('Sort order must be "asc" or "desc"');

      return function(a, b) {
        // a should come before b in the sorted order
        if (a[property] < b[property]) {
          return -1 * sort_order;
          // a should come after b in the sorted order
        } else if (a[property] > b[property]) {
          return 1 * sort_order;
          // a and b are the same
        } else {
          return 0 * sort_order;
        }
      };
    }
    userbals.sort(dynamicsort("json", "asc"));

    const embed = new Discord.MessageEmbed();
    let value = "";
    for (var item in userbals) {
      value += `${item.username}: ${item.data}`;
    }
    m.edit(value);
  }
};
