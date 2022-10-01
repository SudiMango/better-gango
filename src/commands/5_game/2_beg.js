const currencySchema = require("../../database/currencySchema.js")
const dictionary = require("../../features/dictionary.js")
const usersMap = new Map()

module.exports = {
  name: "beg",
  description: "Beg for mangoes u broke ahh mfer",
  type: "Game",
  async execute(msg, args, client, prefix, bannedWords, muteRole) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    if (usersMap.has(msg.author.id)) {
      const userData = usersMap.get(msg.author.id)
      let msgCount = userData.msgCount
      if (parseInt(msgCount) === 1) {
        return msg.reply("Hold your horses! You can only beg every 30 seconds!")
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
      }, 30000)
    }

    if (args.length === 1) {
      let randomNum = Math.floor(Math.random() * 50) + 1
      let responses = [
        `A random person called u broke and gave u **${randomNum} mangoes** 😂`,
        `The CEO of Mangoes donated **${randomNum} mangoes** to u coz ur just that broke 😂`,
        `A McDonald's employee found you eating from the garbage and gave u **${randomNum} mangoes**`,
        `Jeff Bezos gave u **${randomNum} mangoes** and told u to get a life 😭`,
        `Your dad called you a disappointment and gave u **${randomNum} mangoes**`,
        `A street begger thought u were so broke that he gave u **${randomNum} mangoes** 😂`,
        `Your mom gave u **${randomNum} mangoes** and then proceeded to call you a mistake 😭`,
        `A poor lady on the street gave u her last **${randomNum} mangoes** coz yo broke ass wouldn't stop bugging her`,
      ]
      let result = Math.floor(Math.random() * responses.length)

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
      return msg.reply(responses[result])
    } else {
      usersMap.delete(msg.author.id)
      msg.reply("that aint a command bruh 💀")
    }
  },
}
