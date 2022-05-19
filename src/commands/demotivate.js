const axios = require("axios")

module.exports = {
  name: "demotivate",
  description: "demotivate cmd",

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
