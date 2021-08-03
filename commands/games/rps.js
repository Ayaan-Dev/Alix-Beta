const { MessageEmbed } = require("discord.js");
const { cyan } = require("../../colours.json");
const { promptMessage } = require("../../function.js");

const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
    config: {
        name: "rps",
        aliases: ["rps"],
        usage: "!!rps",
        category: "games",
        description: "Rock Paper Scissors game. React to one of the emojis to play the game.",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        const embed = new MessageEmbed()
            .setColor(cyan)
            .setFooter(message.guild.me.displayName, bot.user.displayAvatarURL())
            .setDescription("Add a reaction to one of these emojis to play the game!")
            .setTimestamp();

        const m = await message.channel.send(embed);
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        const result = await getResult(reacted, botChoice);
        await m.clearReactions();

        embed
            .setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);

        m.edit(embed);

        function getResult(me, botChosen) {
            if ((me === "🗻" && botChosen === "✂") ||
                (me === "📰" && botChosen === "🗻") ||
                (me === "✂" && botChosen === "📰")) {
                    return "You won!";
            } else if (me === botChosen) {
                return "It's a tie!";
            } else {
                return "You lost!";
            }
        }
    }
}