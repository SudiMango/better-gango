const axios = require("axios")
const dictionary = require("../../features/dictionary.js")

module.exports = {
  name: "inspire",
  description: "Inspire yourself with an inspirational quote sent by the bot!",
  type: "Advanced",
  func: function () {
    return axios
      .get("https://zenquotes.io/api/random")
      .then((res) => {
        return res.data
      })

      .then((res) => {
        return res[0]["q"] + " - " + res[0]["a"]
      })
  },

  async execute(msg, args, client, prefix, bannedWords, muteRole) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    switch (args.length) {
      case 1:
        module.exports.func().then((res) => {
          msg.reply(res)
        })
        break
      default:
        msg.reply("that aint a command bruh 💀")
        break
    }
  },
}
