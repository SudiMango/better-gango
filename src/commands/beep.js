module.exports = {
  name: "beep",
  description: "beep cmd",
  execute(msg, args) {
    switch (args.length) {
      case 1:
        msg.reply("boop")
        break
      case 2:
        if (args[1] === "boop") {
          msg.reply("boop")
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
