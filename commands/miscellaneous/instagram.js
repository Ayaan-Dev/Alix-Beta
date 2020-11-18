const Discord = require("discord.js");
const Insta = require('scraper-instagram');
const AlixInstagram = new Insta();
const { InstaToken } = require("../../botconfig")
let yourSessionId = InstaToken;

module.exports = {
  config: {
    name: "instagram",
    aliases: ["insta"],
    category: "general",
    accessableby: "ALL"
  },
  run: async (bot, message, args) => {
    //get the name to search for
    if (!args[0]) {
        return message.channel.send(`**Please provide me a valid Instagram name!**`)
    }
	try{	
		AlixInstagram.authBySessionId(yourSessionId)
		.then((Insta) => {
        	AlixInstagram.getProfile(args[0])
        	.then(alix => {
			const embed = new Discord.MessageEmbed()
                .setAuthor(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setColor("RANDOM")
                .setTitle(`${alix.name} Instagram Profile`)
				.setURL(alix.link)
                .setThumbnail(alix.pic)
                .setDescription(`
                    **ID**: ${alix.id}
                    **Nickname :** ${alix.name}
                    **Followers :** ${alix.followers} followers
                    **Following :** ${alix.following} following
                    **Posts :** ${alix.posts || 0}
                    **Private :** ${alix.private ? "Yes 🔐" : "No 🔓"}
                    **Verified :** ${alix.verified ? "Yes <a:ver:722313161419522070>" : "No"}
                    **Biography :** ${alix.bio || "No Bio"}
					**Website :** ${alix.website || "No Website"}`)
            message.channel.send(embed)
})
 
    })
    } catch (err) {
        console.error(err);
    }
  }
};
