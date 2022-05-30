const currencySchema = require("../../database/currencySchema.js")
const dictionary = require("../../features/dictionary.js")

module.exports = {
  name: "withdraw",
  description: "Withdraw mangoes from your bank to your wallet",
  type: "Game",
  aliases: ["wd", "wdr"],
  async execute(msg, args, client, prefix, bannedWords, muteRole) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    if (args.length >= 3) return msg.reply("that aint a command bruh 💀")

    const amount = args[1]
    const configFile = await currencySchema.findOne({ UserID: msg.author.id })

    if (!amount || amount % 1 != 0 || amount <= 0 || isNaN(amount))
      return msg.reply("tf u tryna withdraw bruh 💀")

    try {
      if (amount > configFile.Bank)
        return msg.reply(
          "U don't even have that many mangoes u broke ahh mfer 💀"
        )

      await currencySchema
        .findOneAndUpdate(
          {
            UserID: msg.author.id,
          },
          {
            $inc: {
              Mangoes: amount,
              Bank: -amount,
            },
          }
        )
        .catch((err) => {
          console.log(err)
        })

      return msg.reply(`Withdrew **${amount} mangoes** to wallet`)
    } catch (err) {
      console.log(err)
    }
  },
}
