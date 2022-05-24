const dictionary = require("../features/dictionary.js")

module.exports = {
  name: "beep",
  description: "beep cmd",
  type: "simple",
  async execute(msg, args) {
    let foundInText = await dictionary(msg)

    if (foundInText) return

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
