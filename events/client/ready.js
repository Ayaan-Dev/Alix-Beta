const http = require("http");
const express = require("express");
const app = express();
var server = http.createServer(app);

app.get("/", (request, response) => {
  console.log(`Ping Received.`);
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("ayaangamingbot");
});

const listener = server.listen(process.env.PORT, function() {
  console.log(`Your app is listening on port ` + listener.address().port);
});
setInterval(() => {
  http.get(`http://ayaangamingbot.glitch.me`);
}, 280000);

const { RichEmbed } = require("discord.js");
const Discord = require("discord.js");
const { cyan } = require("../../colours.json");
const Canvas = require("canvas");
const db = require("quick.db");
const { badwords } = require("../../data.json");
const { default_prefix } = require("../../botconfig.json");
const guildInvites = new Map();
const { ErelaClient, Utils } = require("erela.js");
const { nodes } = require("../../botconfig.json");


const applyText = (canvas, text) => {
  const ctx = canvas.getContext("2d");
  let fontSize = 70;

  do {
    ctx.font = `${(fontSize -= 10)}px sans-serif`;
  } while (ctx.measureText(text).width > canvas.width - 300);

  return ctx.font;
};

module.exports = bot => {
  console.log(`${bot.user.username} is online`);

  bot.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
  
   bot.music = new ErelaClient(bot, nodes)
        .on("nodeError", console.log)
        .on("nodeConnect", () => console.log("Successfully created a new Node."))
        .on("queueEnd", player => {
            const rr = new RichEmbed()
            .setColor(cyan)
            .setDescription(`**Queue has ended.**`)
            player.textChannel.send(rr)
            return bot.music.players.destroy(player.guild.id)
        })
        .on("trackStart", ({textChannel}, {title, duration}) => {
        const FG = new RichEmbed()
        .setColor(cyan)
        .setDescription(`**Now playing:** **${title}** **\`${Utils.formatTime(duration, true)}\`**`)
        textChannel.send(FG);
        })

    bot.levels = new Map()
        .set("none", 0.0)
        .set("low", 0.10)
        .set("medium", 0.15)
        .set("high", 0.25);

  
  bot.on("guildMemberAdd", async e => {
    const embed = new RichEmbed()
      .setColor(cyan)
      .setAuthor(`${e.user.username}`, e.user.displayAvatarURL)
      .setTitle(
        `<a:dance1005:698504608624017409> WELCOME TO __${e.guild.name}__`
      )
      .setThumbnail(e.guild.iconURL)
      .addField(
        `<a:verify5500:698222635091230750> You Are The __${e.guild.memberCount} Member__ Of The Server!!`,
        `__**Please Enjoy And Have Fun :)**__`
      )
      .addField(
        "Support Us:",
        "[Support Server](https://discord.gg/6nMhnkn) | [Bot Invite](https://discordapp.com/oauth2/authorize?client_id=703819372317114378&scope=bot&permissions=2146958847)"
      )
      .setImage(
        "https://media1.tenor.com/images/2e098dc3fe43b5cbde63373c16483cd7/tenor.gif?itemid=16798492"
      )
      .setFooter(`Welcome To ${e.guild.name}`, e.guild.iconURL);
    e.user.send(embed);

    let chx = db.get(`welchannel_${e.guild.id}`);

    if (chx === null) {
      return;
    }

    let wembed = new RichEmbed()
      .setAuthor(e.user.username, e.user.avatarURL)
      .setColor("#0032FF")
      .setImage(
        "https://cdn.discordapp.com/attachments/696417925418057789/716197399336583178/giphy.gif"
      )
      .setTitle("<a:AW1:709807397782290582> <a:AE1:709807397434294294> <a:AL1:709807328710623345> <a:AC1:709807395123101856> <a:AO1:709807396238917662> <a:AM1:709807393764016248> <a:AE1:709807397434294294>")
      .addField(":page_facing_up: Name:", e.user)
      .addField(":credit_card: User ID:", e.id)
      .addField(
        ":chart_with_upwards_trend:  Member Count:",
        e.guild.memberCount
      )
      .setFooter(e.guild.name)
      .setTimestamp(e.guild.createdAt)
      .setThumbnail(e.user.displayAvatarURL)
      .setDescription("Welcome :tada: Have Fun!");

    bot.channels.get(chx).send(wembed);

    const serverstats = new db.table("ServerStats");
    let sguildid = await serverstats.fetch(`Stats_${e.guild.id}`, {
      target: ".guildid"
    });
    let tusers = await serverstats.fetch(`Stats_${e.guild.id}`, {
      target: ".totusers"
    });
    let membs = await serverstats.fetch(`Stats_${e.guild.id}`, {
      target: ".membcount"
    });
    let bots = await serverstats.fetch(`Stats_${e.guild.id}`, {
      target: ".botcount"
    });

    const totalsize = e.guild.memberCount;
    const botsize = e.guild.members.filter(m => m.user.bot).size;
    const humansize = totalsize - botsize;

    if (e.guild.id === sguildid) {
      e.guild.channels
        .get(tusers)
        .setName("Total Users : " + e.guild.memberCount);
      e.guild.channels.get(membs).setName("Human Users : " + humansize);
      e.guild.channels
        .get(bots)
        .setName("Bot Users : " + e.guild.members.filter(m => m.user.bot).size);
    }
    
    const cachedInvites = guildInvites.get(e.guild.id);
    const newInvites = await e.guild.fetchInvites();
    guildInvites.set(e.guild.id, newInvites);
    try {
        const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
        const embed = new RichEmbed()
            .setColor(cyan)
            .setDescription(`<a:ar1500:701755206433636412>**${e.user.tag}** is the **${e.guild.memberCount}** to join.\n\n<a:ar1500:701755206433636412>Joined using **${usedInvite.inviter.tag}**\n\n<a:ar1500:701755206433636412>Number of uses: **${usedInvite.uses}**`)
            .setTimestamp()
            .setTitle(`${usedInvite.url}`);
        const welcomeChannel = e.guild.channels.find(channel => channel.id === '715061320831074325');
        if(welcomeChannel) {
            welcomeChannel.send(embed).catch(err => console.log(err));
        }
    }
    catch(err) {
        console.log(err);
    }
  });

  bot.on(`guildMemberRemove`, ef => {
    const embedr = new RichEmbed()
      .setColor(cyan)
      .setAuthor(`${ef.user.username}`, ef.user.displayAvatarURL)
      .setThumbnail(ef.guild.iconURL)
      .setDescription(
        "Thanks For Being Our Servers Partner, Have A Good Day\n__**Bye Bye**__ 😭"
      )
      .setImage(
        "https://cdn.discordapp.com/attachments/693425576047935518/713783187268042802/tenor.gif"
      )
      .setTimestamp()
      .setFooter(`Bye Dude`);
    ef.user.send(embedr);

    let chx = db.get(`leavechannel_${ef.guild.id}`);

    if (chx === null) {
      return;
    }

    let wembed = new RichEmbed()
      .setAuthor(ef.user.username, ef.user.avatarURL)
      .setColor("#FF2D00")
      .setImage(
        "https://cdn.discordapp.com/attachments/696417925418057789/716569729581711360/tenor.gif"
      )
      .setTitle("Goodbye")
      .addField(":page_facing_up: Name:", ef.user)
      .addField(":credit_card: User ID:", ef.id)
      .addField(
        ":chart_with_upwards_trend:  Member Count:",
        ef.guild.memberCount
      )
      .setFooter(ef.guild.name)
      .setTimestamp(ef.guild.createdAt)
      .setThumbnail(ef.user.displayAvatarURL)
      .setDescription("Goodbye ", ef.user);

    bot.channels.get(chx).send(wembed);
    
    const serverstats = new db.table('ServerStats');
  let sguildid = serverstats.fetch(`Stats_${ef.guild.id}`, { target: '.guildid' })
  let tusers = serverstats.fetch(`Stats_${ef.guild.id}`, { target: '.totusers' })
  let membs = serverstats.fetch(`Stats_${ef.guild.id}`, { target: '.membcount' })
  let bots = serverstats.fetch(`Stats_${ef.guild.id}`, { target: '.botcount' })
  
	const totalsize = ef.guild.memberCount;
	const botsize = ef.guild.members.filter(m => m.user.bot).size;
	const humansize = totalsize - botsize;
  
  if(ef.guild.id === sguildid) { 
		ef.guild.channels.get(tusers).setName("Total Users : " + ef.guild.memberCount);
		ef.guild.channels.get(membs).setName("Human Users : " + humansize);
		ef.guild.channels.get(bots).setName("Bot Users : " + ef.guild.members.filter(m => m.user.bot).size);
	}
  });
  
  bot.on('guildCreate', guild => {
    const gdgdgd = new RichEmbed()
    .setColor(cyan)
    .setDescription(`**New guild joined: ${ guild.name }. This guild has ${ guild.memberCount } members!**`)
    .setTimestamp()
    bot.channels.get('715065737898623006').send(gdgdgd)
  })
  
  bot.on('guildDelete', guild => {
    const ffffff = new RichEmbed()
    .setColor(cyan)
    .setDescription(`**I have been kicked out from ${ guild.name }. that guild has ${ guild.memberCount } members!**`)
    .setTimestamp()
    bot.channels.get('715065737898623006').send(ffffff)
  })

  bot.on("message", async message => {
    if (message.author.bot) return;

    if (!message.member.hasPermission("ADMINISTRATOR")) {
      if (message.content.includes("discord.gg/" || "discordapp.com/invite/")) {
        //if it contains an invite link
        message.delete(); //delete the message
        const gfds = new RichEmbed()
          .setColor(cyan)
          .setTitle(`Link Deceted`)
          .setDescription(`**Invite links are not permitted on this server**`);
        return message.channel.send(gfds);
      }
      if (message.content.includes("http://")) {
        console.log("deleted " + message.content + " from " + message.author);
        message.delete(1);
        const yag = new RichEmbed()
          .setColor(cyan)
          .setTitle(`Link Deceted`)
          .setDescription(`**Invite links are not permitted on this server**`);
        return message.channel.send(yag);
      }
    }

    db.add(`messages_${message.guild.id}_${message.author.id}`, 1);
    let messagefetch = db.fetch(
      `messages_${message.guild.id}_${message.author.id}`
    );

    let messages;
   if (messagefetch == 25) messages = 25;
    //Level 1
    else if (messagefetch == 100) messages = 100;
    // Level 2
    else if (messagefetch == 215) messages = 215;
    // Level 3
    else if (messagefetch == 500) messages = 500;
    // Level 4
    else if (messagefetch == 1500) messages = 1500;
    // Level 5
     else if (messagefetch == 2000) messages = 2000;// Level 6

    else if (messagefetch == 5000) messages = 5000;

    else if (messagefetch == 7000) messages = 7000;

    else if (messagefetch == 8000) messages = 8000;

    else if (messagefetch == 10000) messages = 10000;


    if (!isNaN(messages)) {
      db.add(`level_${message.guild.id}_${message.author.id}`, 1);
      let levelfetch = db.fetch(
        `level_${message.guild.id}_${message.author.id}`
      );

      let levelembed = new Discord.RichEmbed()
        .setColor(cyan)
        .setTitle("Leveled Up")
        .setThumbnail("https://cdn.discordapp.com/attachments/715085497915146263/716857728198377512/tenor_1.gif")
        .setDescription(
          `**${message.author.username}**, You have leveled up to level **${levelfetch}**`
        )
        .setTimestamp()
      message.channel.send(levelembed);
    }
  });
  
  bot.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.id === '715102809791660063')
        await message.delete();
    if(message.content.toLowerCase() === '!!verify' && message.channel.id === '715102809791660063')
    {   
        await message.delete().catch(err => console.log(err));
        const role = message.guild.roles.get('715060227485204481');
        if(role) {
            try {
                await message.member.addRole(role);
                const embed = new RichEmbed()
                .setColor('#00FFFF')
                .setDescription(`**You Have Been Verified In This Server**`)
                return message.channel.send(embed).then(msg => {msg.delete(20000)});
            }
            catch(err) {
                console.log(err);
            }
        }
    }
});

  let activities = [
      `${bot.guilds.size} servers!`,
      `${bot.channels.size} channels!`,
      `${bot.users.size} users!`
    ],
    i = 0;
  setInterval(
    () =>
      bot.user.setActivity(`!!help | ${activities[i++ % activities.length]}`, {
        type: "WATCHING"
      }),
    7000
  );
     bot.guilds.forEach(guild => {
        guild.fetchInvites()
            .then(invites => guildInvites.set(guild.id, invites))
            .catch(err => console.log(err));
    });
};
