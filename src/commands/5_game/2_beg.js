const currencySchema = require("../../database/currencySchema.js")
const dictionary = require("../../features/dictionary.js")

module.exports = {
  name: "beg",
  description: "Beg for mangoes u broke ahh mfer",
  type: "Game",
  async execute(msg, args) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    let randomNum = Math.floor(Math.random() * 50) + 1
    let responses = [
      `A random person called u broke and gave u **${randomNum} mangoes** 😂`,
      `The CEO of Mangoes donated **${randomNum} mangoes** to u coz ur just that broke 😂`,
      `A McDonald's employee found you eating from the garbage and gave u **${randomNum} mangoes**`,
      `Jeff Bezos gave u **${randomNum} mangoes** and told u to get a life 😭`,
      `Your dad called you a disappointment and gave u **${randomNum} mangoes**`,
      `A street begger thought u were so broke that he gave u **${randomNum} mangoes** 😂`,
      `Your mom gave u **${randomNum} mangoes** and then proceeded to call you a mistake 😭`,
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
  },
}
