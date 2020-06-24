module.exports = bot => {
  let ptompt = process.openStdin();
  ptompt.addListener("data", res => {
    let x = res
      .toString()
      .trim()
      .split(/ +/g);
    bot.channels.get("725347186925109248").send(x.join(" "));
  });
};
