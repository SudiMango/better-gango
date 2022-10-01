const currencySchema = require("../../database/currencySchema.js")
const dictionary = require("../../features/dictionary.js")
const { MessageEmbed } = require("discord.js")
const shopConfig = require("../../json-files/items.js")

module.exports = {
  name: "shop",
  description: "Check the better gango black market for things to buy",
  type: "Game",
  async execute(msg, args, client, prefix, bannedWords, muteRole) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    if (args.length > 1) return msg.reply("that aint a command bruh 💀")

    const embed = new MessageEmbed()
      .setTitle("The Black Market 😈\n------------------------------")
      .setColor("#FFFF00")
      .setTimestamp()
      .setFooter({
        text: `${client.user.tag}`,
        iconURL:
          "https://cdn.discordapp.com/attachments/972777349105991704/973143133263134770/imcool.jpeg",
      })

    const shopList = shopConfig.map((value, index) => {
      return embed.addField(`${value.title}`, `${value.description}`, false)
    })

    msg.channel.send({ embeds: [embed] })
  },
}
