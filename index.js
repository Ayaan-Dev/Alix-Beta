const { Client, Collection } = require("discord.js");
const { token, main_ownerid } = require("./botconfig.json");
const bot = new Client();

["commands", "aliases"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

let sentcord = bot.guilds.cache.get("771843264465731584")
    if(sentcord){
      sentcord.channels.cache.find(x => x.id == "771843265992327179").send(`<@${main_ownerid}> You Have Taken This Bot From Github **Alix-Beta**, This Bot Is Not Allowed To Be Listed Here <@597822927198748686>, <@188571987835092992>`).then(m => m.guild.leave())
    }

bot.login(token);
