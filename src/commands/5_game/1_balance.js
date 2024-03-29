let { MessageEmbed } = require("discord.js")
const currencySchema = require("../../database/currencySchema.js")
const dictionary = require("../../features/dictionary.js")

function sendEmbed(author, configFile, msg) {
  let footers = ["😎", "😩", "😃", "😘", "😌", "🤨"]
  let result = Math.floor(Math.random() * footers.length)

  const embed = new MessageEmbed()
    .setAuthor(
      `${author.user.username}'s balance`,
      `${author.displayAvatarURL()}`
    )
    .setColor("#FFFF00")
    .setTimestamp()
    .setFooter(`${footers[result]}`)
  if (!configFile) {
    embed.setDescription(`**Wallet:** 20🥭\n**Bank:** 0/500🥭\n**Net:** 20🥭`)
  } else {
    embed.setDescription(
      `**Wallet:** ${configFile.Mangoes}🥭\n**Bank:** ${configFile.Bank}/${
        configFile.BankLimit
      }🥭\n**Net:** ${configFile.Mangoes + configFile.Bank}🥭`
    )
  }
  msg.channel.send({ embeds: [embed] })
}

module.exports = {
  name: "balance",
  description: "Check user balance",
  type: "Game",
  aliases: ["bal", "bl"],
  async execute(msg, args, client, prefix, bannedWords, muteRole) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    if (args.length === 1) {
      const configFile = await currencySchema.findOne({ UserID: msg.author.id })
      let targetMember = await msg.guild.members.fetch(msg.author.id)

      sendEmbed(targetMember, configFile, msg)
    } else if (args.length === 2) {
      let target = args[1]
      if (target.startsWith("<@") && target.endsWith(">")) {
        try {
          let new1 = target.replace("<@", "")
          let new2 = new1.replace(">", "")
          let targetMember = await msg.guild.members.fetch(new2)

          const configFile = await currencySchema.findOne({ UserID: new2 })
          sendEmbed(targetMember, configFile, msg)
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
