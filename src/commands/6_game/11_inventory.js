const dictionary = require("../../features/dictionary.js")
const { MessageEmbed } = require("discord.js")
const inventory = require("../../database/inventory.js")
const items = require("../../json-files/items.js")

function sendEmbed(author, kinds, msg) {
  let footers = ["😎", "😩", "😃", "😘", "😌", "🤨"]
  let result = Math.floor(Math.random() * footers.length)

  const embed = new MessageEmbed()
    .setAuthor(
      `${author.user.username}'s inventory`,
      `${author.displayAvatarURL()}`
    )
    .setColor("#FFFF00")
    .setTimestamp()
    .setFooter(`${footers[result]}`)

  for (var i = 0; i < kinds.length; i++) {
    var split = kinds[i].split(":")
    console.log(split[0], split[1])
    let validItem = items.find((val) => val.item.toLowerCase() === split[0])
    embed.addField(
      `${validItem.emoji} ${validItem.name} -- ${split[1]}`,
      `*ID ${validItem.item} -- ${validItem.type}*\nㅤ`,
      false
    )
  }

  msg.channel.send({ embeds: [embed] })
}

module.exports = {
  name: "inventory",
  description: "Check user inventory",
  type: "Game",
  aliases: ["inv"],
  async execute(msg, args, client, prefix, bannedWords, muteRole) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    if (args.length === 1) {
      inventory.findOne({ UserID: msg.author.id }, async (err, data) => {
        if (!data || !Object.keys(data.Inventory)[0])
          return msg.reply(
            "U literally got nothing in ur inventory, just stop checking."
          )
        const mappedData = Object.keys(data.Inventory)
          .map((key) => {
            return `${key}:${data.Inventory[key]}`
          })
          .join(",")

        let targetMember = await msg.guild.members.fetch(msg.author.id)
        let kinds = mappedData.split(",")
        sendEmbed(targetMember, kinds, msg)
      })
    } else if (args.length === 2) {
      let target = args[1]
      if (target.startsWith("<@") && target.endsWith(">")) {
        try {
          let new1 = target.replace("<@", "")
          let new2 = new1.replace(">", "")
          let targetMember = await msg.guild.members.fetch(new2)

          inventory.findOne({ UserID: new2 }, async (err, data) => {
            if (!data || !Object.keys(data.Inventory)[0])
              return msg.reply(
                "They literally got nothing in their inventory 😂"
              )
            const mappedData = Object.keys(data.Inventory)
              .map((key) => {
                return `${key}:${data.Inventory[key]}`
              })
              .join(",")

            let kinds = mappedData.split(",")
            sendEmbed(targetMember, kinds, msg)
          })
        } catch (err) {
          msg.reply("Please tag a member in this server.")
          console.log(err)
        }
      } else {
        msg.reply("Please tag a member in this server.")
      }
    } else {
      msg.reply("that aint a command bruh 💀")
    }
  },
}
