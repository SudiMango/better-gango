const currencySchema = require("../../database/currencySchema.js")
const dictionary = require("../../features/dictionary.js")

module.exports = {
  name: "give",
  description: "Give mangoes to a fellow broke ahh mfer",
  type: "Game",
  async execute(msg, args, client, prefix, bannedWords, muteRole) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    if (args.length > 3) return msg.reply("that aint a command bruh 💀")
    if (args.length < 3)
      return msg.reply("Please add all the arguments *(;give @user amount)*")

    let target = args[1]
    let amount = args[2]

    if (target.startsWith("<@") && target.endsWith(">")) {
      try {
        let new1 = target.replace("<@", "")
        let new2 = new1.replace(">", "")
        let targetMember = await msg.guild.members.fetch(new2)

        const giverConfigFile = await currencySchema.findOne({
          UserID: msg.author.id,
        })
        const takerConfigFile = await currencySchema.findOne({
          UserID: new2,
        })

        if (!takerConfigFile) {
          let profile = await currencySchema.create({
            UserID: new2,
            ServerID: msg.guild.id,
            Mangoes: 20,
            Bank: 0,
            BankLimit: 500,
          })
          profile.save()
        }

        if (!amount || amount % 1 != 0 || amount <= 0 || isNaN(amount))
          return msg.reply("tf u tryna give bruh 💀")

        try {
          if (amount > giverConfigFile.Mangoes)
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
                  Mangoes: -amount,
                },
              }
            )
            .catch((err) => {
              console.log(err)
            })

          await currencySchema
            .findOneAndUpdate(
              {
                UserID: new2,
              },
              {
                $inc: {
                  Mangoes: amount,
                },
              }
            )
            .catch((err) => {
              console.log(err)
            })

          return msg.reply(
            `Nice! You just gave ${target} **${amount} mangoes!**`
          )
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        msg.reply("Please tag a member in this server.")
        console.log(err)
      }
    } else {
      msg.reply("Please tag a member in this server.")
    }
  },
}
