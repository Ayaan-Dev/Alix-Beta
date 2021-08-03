module.exports = (bot) => {
let ptompt = process.openStdin()
ptompt.addListener("data", res => {
    let x = res.toString().trim().split(/ +/g)
    bot.channels.get("705280457138241566").send(x.join(" "));
});
}