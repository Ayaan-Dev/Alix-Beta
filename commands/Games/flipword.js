const { RichEmbed } = require("discord.js")
const { green } = require("../../colours.json");
const { red } = require("../../colours.json");
const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>?@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~';
// Start with the character '!'
const OFFSET = '!'.charCodeAt(0);

module.exports = {
    config: {
        name: "flipword",
        aliases: ["upsidedown"],
        usage: "<word>",
        category: "Games",
        description: "Flips the word u have given",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
            if (args.length < 1) {
                const ember = new RichEmbed()
                .setColor(red)
                .setDescription(`**You must provide text to flip!**`)
                return message.channel.send(ember);
            }

            const embeer = new RichEmbed()
                .setColor(green)
                .setDescription(args.join(' ').split('')
                .map(c => c.charCodeAt(0) - OFFSET)
                .map(c => mapping[c] || ' ')
                .reverse().join(''))
                message.channel.send(embeer);
    }
}
