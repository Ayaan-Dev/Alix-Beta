const { Client, Collection } = require("discord.js");
const { token } = require("./botconfig.json");
const bot = new Client();

["commands", "aliases"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

bot.login(token);
