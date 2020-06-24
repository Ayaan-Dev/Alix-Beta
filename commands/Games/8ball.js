const { RichEmbed } = require("discord.js")
const { green } = require("../../colours.json");
const { red } = require("../../colours.json");

module.exports = {
    config: {
        name: "8ball",
        aliases: ["8ball"],
        usage: "<question>",
        category: "Games",
        description: "",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
         //!8ball question
        if(!args[1]) {
            const err = new RichEmbed()
            .setColor(red)
            .setDescription(`**Plesae enter a full question with 2 or more words!**`)
            return message.reply(err);
        }
        let replies = ["Yes", "No", "I don't know", "Ask again later!", "Cyka", "I am not sure!", "Pls No", "You tell me", "Without a doubt", "Cannot predict now", "Without a doubt", ];

        let result = Math.floor((Math.random() * replies.length));
        let question = args.join(" ");

        let ballembed = new RichEmbed()

        .setAuthor(message.author.username)
        .setColor("#00ff00")
        .addField("Question", question)
        .addField("Answer", replies[result]);

        message.channel.send(ballembed)

        message.delete();
    }
}