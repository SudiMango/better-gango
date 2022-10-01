const currencySchema = require("../../database/currencySchema.js")
const dictionary = require("../../features/dictionary.js")
const usersMap = new Map()

module.exports = {
  name: "crime",
  description: "Commit crimes to get mass amounts of mangoes!",
  type: "Game",
  async execute(msg, args, client, prefix, bannedWords, muteRole) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    if (args.length > 1) return msg.reply("that aint a command bruh 💀")

    if (usersMap.has(msg.author.id)) {
      const userData = usersMap.get(msg.author.id)
      let msgCount = userData.msgCount
      if (parseInt(msgCount) === 1) {
        return msg.reply(
          "Hey! You got caught while commiting a crime! You have to wait 5 minutes before you can commit another crime!"
        )
      } else {
        msgCount++
        userData.msgCount = msgCount
        usersMap.set(msg.author.id, userData)
      }
    }

    let randomNum = Math.floor(Math.random() * (200 - 50 + 1)) + 50
    let caught = Math.floor(Math.random() * 2)
    let successResponses = [
      `You pick pocketed Jeff Bezos and managed to steal **${randomNum} mangoes** 😳`,
      `You succesfully robbed a mango store and acquired **${randomNum} mangoes** 😳`,
      `You jumped the CEO of Mangoes in a dark alley and stole **${randomNum} mangoes!**`,
    ]
    let caughtResponses = [
      "You got caught robbing a bank! Have fun in jail you rookie 😝",
      "You got caught pick pocketing the CEO of Mangoes! Have fun getting tortured by his goons u rookie 😝",
      "You shot urself by mistake while tryna rob a mango store. The doctors are currently tryna save u from ur stupidity.",
    ]
    let successResult = Math.floor(Math.random() * successResponses.length)
    let caughtResult = Math.floor(Math.random() * caughtResponses.length)

    if (caught === 0) {
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

      return msg.reply(successResponses[successResult])
    } else if (caught === 1) {
      usersMap.set(msg.author.id, {
        msgCount: 1,
        Timer: 300000,
      })
      const userData = usersMap.get(msg.author.id)
      let Timer = userData.Timer
      setTimeout(() => {
        usersMap.delete(msg.author.id)
        console.log("removed from map")
      }, Timer)
      return msg.reply(caughtResponses[caughtResult])
    }
  },
}
