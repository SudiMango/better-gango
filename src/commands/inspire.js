const axios = require("axios")

module.exports = {
  name: "inspire",
  description: "inspire cmd",

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

  execute(msg, args) {
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
