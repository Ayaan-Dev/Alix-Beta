const Discord = require('discord.js')
const db = require('quick.db')
const { green } = require("../../colours.json");
const { red } = require("../../colours.json");

module.exports = {
    config: {
        name: "buy",
        aliases: ["buy", "buyy"],
        usage: "",
        category: "Economy",
        description: "",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
             let user = message.author;

        let author = db.fetch(`money_${message.guild.id}_${user.id}`)

        let Embed = new Discord.RichEmbed()
        .setColor(red)
        .setDescription(`<a:Crossag:712271469064749066> You need 2000 coins to purchase Bronze VIP`);

        if (args[0] == 'bronze') {
            if (author < 3500) return message.channel.send(Embed)

            db.fetch(`bronze_${message.guild.id}_${user.id}`);
            db.set(`bronze_${message.guild.id}_${user.id}`, true)

            let Embed2 = new Discord.RichEmbed()
            .setColor(green)
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
            .setDescription(`<a:verify5500:698222635091230750> Purchased Bronze VIP For 3500 Coins`);

            db.subtract(`money_${message.guild.id}_${user.id}`, 3500)
            message.channel.send(Embed2)
        } else if(args[0] == 'nikes') {
            let Embed2 = new Discord.RichEmbed()
            .setColor(red)
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
            .setDescription(`<a:Crossag:712271469064749066> You need 600 coins to purchase some Nikes`);

            if (author < 600) return message.channel.send(Embed2)

            db.fetch(`nikes_${message.guild.id}_${user.id}`)
            db.add(`nikes_${message.guild.id}_${user.id}`, 1)

            let Embed3 = new Discord.RichEmbed()
            .setColor(green)
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
            .setDescription(`<a:verify5500:698222635091230750> Purchased Fresh Nikes For 600 Coins`);

            db.subtract(`money_${message.guild.id}_${user.id}`, 600)
            message.channel.send(Embed3)
        } else if(args[0] == 'car') {
            let Embed2 = new Discord.RichEmbed()
            .setColor(red)
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
            .setDescription(`<a:Crossag:712271469064749066> You need 800 coins to purchase a new car`);

            if (author < 800) return message.channel.send(Embed2)

            db.fetch(`car_${message.guild.id}_${user.id}`)
            db.add(`car_${message.guild.id}_${user.id}`, 1)

            let Embed3 = new Discord.RichEmbed()
            .setColor(green)
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
            .setDescription(`<a:verify5500:698222635091230750> Purchased a New Car For 800 Coins`);

            db.subtract(`money_${message.guild.id}_${user.id}`, 800)
            message.channel.send(Embed3)
        } else if(args[0] == 'mansion') {
            let Embed2 = new Discord.RichEmbed()
            .setColor(red)
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
            .setDescription(`<a:Crossag:712271469064749066> You need 1200 coins to purchase a Mansion`);

            if (author < 1200) return message.channel.send(Embed2)

            db.fetch(`house_${message.guild.id}_${user.id}`)
            db.add(`house_${message.guild.id}_${user.id}`, 1)

            let Embed3 = new Discord.RichEmbed()
            .setColor(green)
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
            .setDescription(`<a:verify5500:698222635091230750> Purchased a Mansion For 1200 Coins`);

            db.subtract(`money_${message.guild.id}_${user.id}`, 1200)
            message.channel.send(Embed3)
          } else if(args[0] == 'nickname') {
            let Embed2 = new Discord.RichEmbed()
            .setColor(red)
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
            .setDescription(`<a:Crossag:712271469064749066> You need 200 coins to purchase a new car`);

            if (author < 200) return message.channel.send(Embed2)

            db.fetch(`car_${message.guild.id}_${user.id}`)
            db.add(`car_${message.guild.id}_${user.id}`, 1)

            let Embed3 = new Discord.RichEmbed()
            .setColor(green)
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
            .setDescription(`<a:verify5500:698222635091230750> Purchased a Nickname For 200 Coins`);

            db.subtract(`money_${message.guild.id}_${user.id}`, 200)
            message.member.setNickname(message.content.replace('changeNick ', ''));
            message.channel.send(Embed3)
        } else {
            let embed3 = new Discord.RichEmbed()
            .setColor(red)
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
            .setDescription('<a:Crossag:712271469064749066> Enter an item to buy')
            message.channel.send(embed3)
        } 
    }
}
