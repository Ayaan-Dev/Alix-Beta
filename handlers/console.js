module.exports = bot => {
  let ptompt = process.openStdin();
  ptompt.addListener("data", res => {
    let x = res
      .toString()
      .trim()
      .split(/ +/g);
    bot.channels.get("706770728854356041").send(x.join(" "));
  });
};
