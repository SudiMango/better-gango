const currencySchema = require("../../database/currencySchema.js")
const dictionary = require("../../features/dictionary.js")

module.exports = {
  name: "deposit",
  description: "Deposit mangoes from your wallet to your bank",
  type: "Game",
  aliases: ["dep", "depo", "dp", "dps"],
  async execute(msg, args, client, prefix, bannedWords, muteRole) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    if (args.length >= 3) return msg.reply("that aint a command bruh 💀")

    const amount = args[1]
    const configFile = await currencySchema.findOne({ UserID: msg.author.id })

    if (!amount || amount % 1 != 0 || amount <= 0 || isNaN(amount))
      return msg.reply("tf u tryna deposit bruh 💀")

    try {
      if (amount > configFile.Mangoes)
        return msg.reply(
          "U don't even have that many mangoes u broke ahh mfer 💀"
        )

      let diff = configFile.BankLimit - configFile.Bank

      if (amount > diff)
        return msg.reply(
          "U don't have enough space in ur bank u broke ahh mfer 💀"
        )

      await currencySchema
        .findOneAndUpdate(
          {
            UserID: msg.author.id,
          },
          {
            $inc: {
              Mangoes: -amount,
              Bank: amount,
            },
          }
        )
        .catch((err) => {
          console.log(err)
        })

      return msg.reply(`Deposited ${amount} mangoes to bank`)
    } catch (err) {
      console.log(err)
    }
  },
}
