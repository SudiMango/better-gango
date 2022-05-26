const dictionary = require("../../features/dictionary.js")

module.exports = {
  name: "bing",
  description: "Responds with bong",
  type: "Simple",
  async execute(msg, args) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

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
