const dictionary = require("../../features/dictionary.js")

module.exports = {
  name: "ping",
  description: "Check the bot's latency and the Discord API's latency",
  type: "Simple",
  async execute(msg, args, client, prefix, bannedWords, muteRole) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    switch (args.length) {
      case 1:
        msg.reply(
          `Pong!\nMessage latency is *${
            Date.now() - msg.createdTimestamp
          }ms*. Discord API latency is *${Math.round(client.ws.ping)}ms*.`
        )
        break
      case 2:
        if (args[1] === "pong") {
          msg.reply(
            `Pong!\nMessage latency is *${
              Date.now() - msg.createdTimestamp
            }ms*. Discord API latency is *${Math.round(client.ws.ping)}ms*.`
          )
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
