const axios = require("axios")
const dictionary = require("../../features/dictionary.js")

module.exports = {
  name: "demotivate",
  description:
    "Demotivate yourself with a demotivational quote sent by the bot :(",
  type: "Advanced",
  func: function () {
    return axios
      .get("https://demotivational-quotes-api.herokuapp.com/api/quotes/random")
      .then((res) => {
        return res.data
      })

      .then((res) => {
        return res["quote"] + " - " + res["author"]
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
