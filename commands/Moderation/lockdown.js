const Discord = require("discord.js");
const ms = require("ms")

module.exports = {
    config: {
    name: "lockdown",
    description: "Lock a channel",
    usage: "<duration>",
    category: "Moderation",
    accessableby: "Moderators",
    aliases: ["lock"] 
    },
    run: async (bot, message, args) => {
        if(!bot.lockit) bot.lockit = [];
    let time = args.join(' ');
    let validUnlocks = ['relase', 'unlock'];
    if(!time) return message.channel.send('You must set a duration for the lockdown!')

    if(validUnlocks.includes(time)) {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        }).then(() => {
            message.channel.sendMessage('Lockdown has been lifted!');
            clearTimeout(bot.lockit[message.channel.id]);
            delete bot.lockit[message.channel.id];
        }).catch(error => {
            console.log(error);
        });
    } else {
        message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: false
        }).then(() => {
            message.channel.sendMessage(`Channel Locked for ${ms(ms(time), { long:true})}`).then(() => {
                bot.lockit[message.channel.id] = setTimeout(() => {
                    message.channel.overwritePermissions(message.guild.id, {
                        SEND_MESSAGES: false
                    }).then(message.channel.sendMessage('Lockdown Lifted')).catch(console.error);
                    delete bot.lockit[message.channel.id];
                }, ms(time));
            }).catch(error => {
                console.log(error)
            })
        })
    }
}
}
