module.exports = {
    config: {
        name: "reverse",
        aliases: ["rvc"],
        usage: "<word>",
        category: "games",
        description: "Reverse the word you have given!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        if (args.length < 1) {
            throw 'You must input text to be reversed!';
        }
        message.reply(args.join(' ').split('').reverse().join(''));
    }
}