const currencySchema = require("../../database/currencySchema.js")
const dictionary = require("../../features/dictionary.js")
const { MessageEmbed } = require("discord.js")
const shopConfig = require("../../json-files/items.js")
const inventory = require("../../database/inventory.js")

module.exports = {
  name: "buy",
  description: "Buy items from the better gango black market!",
  type: "Game",
  async execute(msg, args, client, prefix, bannedWords, muteRole) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    if (args.length < 2 || args.length > 2)
      return msg.reply("tf u tryna buy bruh 💀")

    let buyName = args[1].toLowerCase()

    let validItem = shopConfig.find((val) => val.item.toLowerCase() === buyName)

    if (!validItem) return msg.reply("tf u tryna buy bruh 💀")

    let itemPrice = shopConfig.find(
      (val) => val.item.toLowerCase() === buyName
    ).price

    const ConfigFile = await currencySchema.findOne({
      UserID: msg.author.id,
    })

    if (ConfigFile.Mangoes < itemPrice)
      return msg.reply(
        "U don't even have that many mangoes u broke ahh mfer 💀"
      )

    inventory.findOne({ UserID: msg.author.id }, async (err, data) => {
      if (data) {
        const hasItem = Object.keys(data.Inventory).includes(buyName)
        if (hasItem > 1) {
          data.Inventory[buyName] = 1
        } else {
          data.Inventory[buyName] = null
        }
        console.log(data)
        await inventory.findOneAndUpdate({ UserID: msg.author.id }, data)
        await currencySchema
          .findOneAndUpdate(
            {
              UserID: msg.author.id,
            },
            {
              $inc: {
                Mangoes: -itemPrice,
              },
            }
          )
          .catch((err) => {
            console.log(err)
          })
      } else {
        new inventory({
          UserID: msg.author.id,
          ServerID: msg.guild.id,
          Inventory: {
            [buyName]: 1,
          },
        }).save()
      }
      msg.reply(
        `Nice! You have just bought a **${validItem.name}** for **${itemPrice} mangoes!**`
      )
    })
  },
}
