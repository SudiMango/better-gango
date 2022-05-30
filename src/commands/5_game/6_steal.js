const currencySchema = require("../../database/currencySchema.js")
const dictionary = require("../../features/dictionary.js")
const usersMap = new Map()

module.exports = {
  name: "steal",
  description: "Steal mangoes from people 👀",
  type: "Game",
  async execute(msg, args, client, prefix, bannedWords, muteRole) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    if (args.length > 2 || args.length < 2)
      return msg.reply("that aint a command bruh 💀")

    if (usersMap.has(msg.author.id)) {
      const userData = usersMap.get(msg.author.id)
      let msgCount = userData.msgCount
      if (parseInt(msgCount) === 1) {
        return msg.reply(
          "Hold your horses! You can only steal every 3 minutes!"
        )
      } else {
        msgCount++
        userData.msgCount = msgCount
        usersMap.set(msg.author.id, userData)
      }
    } else {
      usersMap.set(msg.author.id, {
        msgCount: 1,
        lastMessage: msg,
      })
      setTimeout(() => {
        usersMap.delete(msg.author.id)
        console.log("removed from map")
      }, 180000)
    }

    if (args.length === 2) {
      let target = args[1]
      if (target.startsWith("<@") && target.endsWith(">")) {
        try {
          let new1 = target.replace("<@", "")
          let new2 = new1.replace(">", "")
          let targetMember = await msg.guild.members.fetch(new2)

          if (new2 === msg.author.id) {
            usersMap.delete(msg.author.id)
            return msg.reply("U tryna steal from urself? How broke are u 🤨")
          }

          const stolenConfigFile = await currencySchema.findOne({
            UserID: new2,
          })

          if (!stolenConfigFile) {
            let profile = await currencySchema.create({
              UserID: new2,
              ServerID: msg.guild.id,
              Mangoes: 20,
              Bank: 0,
              BankLimit: 500,
            })
            profile.save()
            return msg.reply(
              "Cmon that person barely has anything, it's not worth it."
            )
          }

          try {
            if (stolenConfigFile.Mangoes <= 50) {
              usersMap.delete(msg.author.id)
              return msg.reply(
                "Cmon that person barely has anything, it's not worth it."
              )
            }

            let randomNum = Math.floor(Math.random() * 50) + 1

            await currencySchema
              .findOneAndUpdate(
                {
                  UserID: msg.author.id,
                },
                {
                  $inc: {
                    Mangoes: randomNum,
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
                    Mangoes: -randomNum,
                  },
                }
              )
              .catch((err) => {
                console.log(err)
              })

            return msg.reply(
              `Wow! You managed to steal **${randomNum} mangoes** from ${target}`
            )
          } catch (err) {
            console.log(err)
          }
        } catch (err) {
          usersMap.delete(msg.author.id)
          console.log(err)
          msg.reply("Please tag a member in this server")
        }
      } else {
        usersMap.delete(msg.author.id)
        msg.reply("Please tag a member in this server")
      }
    }
  },
}
