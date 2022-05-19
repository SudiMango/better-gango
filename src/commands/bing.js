module.exports = {
  name: "bing",
  description: "bing cmd",
  execute(msg, args) {
    switch (args.length) {
      case 1:
        msg.reply("bong")
        break
      case 2:
        if (args[1] === "bong") {
          msg.reply("bong")
        } else {
          msg.reply("that aint a command bruh 💀")
        }
        break
      default:
        msg.reply("that aint a command bruh 💀")
        break
    }
  },
}
