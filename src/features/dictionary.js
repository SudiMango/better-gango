const schema = require("../database/guildConfig.js")
const helpConfigs = require("../json-files/helpconfig.json")
const { MessageEmbed } = require("discord.js")

module.exports.FoundInText = async (msg) => {
  const configFile = await schema.findOne({ GuildID: msg.guildId })

  let bannedWords = []
  if (configFile && configFile.BannedWords) {
    bannedWords = configFile.BannedWords
  }

  let foundInText = false
  for (var i in bannedWords) {
    if (!msg.member.permissions.has("ADMINISTRATOR")) {
      if (msg.content.toLowerCase().includes(bannedWords[i].toLowerCase())) {
        foundInText = true
      }
    }
  }

  return foundInText
}

module.exports.AdvHelp = async (client, channel, name, msg) => {
  let findCmd = helpConfigs[name]
  if (!findCmd) return await msg.reply("that aint a command bruh 💀")

  let cmdEmbed = new MessageEmbed()
    .setTitle(findCmd.title)
    .setDescription(findCmd.usage)
    .addField(findCmd.exampleTitle, findCmd.exampleField, true)
    .setImage(findCmd.image)
    .setColor("#FFFF00")
    .setFooter({
      text: client.user.tag,
      iconURL:
        "https://cdn.discordapp.com/attachments/972777349105991704/973143133263134770/imcool.jpeg",
    })
    .setTimestamp()
  if (findCmd.exampleTitle2 && findCmd.exampleField2) {
    cmdEmbed.addField(findCmd.exampleTitle2, findCmd.exampleField2, true)
  }
  if (findCmd.exampleTitle3 && findCmd.exampleField3) {
    cmdEmbed.addField(
      findCmd.exampleTitle3,
      findCmd.exampleField3,
      findCmd.inline
    )
  }

  return await channel.send({ embeds: [cmdEmbed] })
}
