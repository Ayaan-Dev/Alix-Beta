const yoMamma = require('yo-mamma').default;

module.exports = {
    config: {
        name: "yomamma",
        aliases: ["ym"],
        usage: "!!yomamma",
        category: "miscellaneous",
        description: "",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        
    let insult = yoMamma();

    message.channel.send(insult)
    }
}