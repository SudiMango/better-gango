const dictionary = require("../../features/dictionary.js")

module.exports = {
  name: "rr",
  description: "manual reaction role cmd",
  type: "Management",
  async execute(msg, args) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    if (!msg.member.permissions.has("ADMINISTRATOR"))
      return msg.reply("U don't have admin perms bozo 😂")

    if (!args[1])
      return msg.reply(
        "You need to provide all the arguments *(eg. channelID,messageID,emoji,roleID(optional))*"
      )

    switch (args.length) {
      case 1:
        break
      case 2:
        msg.reply(
          "You need to provide the messageID and emoji to react with *(eg. channelID,messageID,emoji,roleID(optional))*"
        )
        break
      case 3:
        msg.reply(
          "You need to provide the emoji to react with *(eg. channelID,messageID,emoji,roleID(optional))*"
        )
        break
      case 4:
        let channel = msg.guild.channels.cache.get(`${args[1]}`)
        let newMsg = await channel.messages.fetch(`${args[2]}`)
        newMsg.react(`${args[3]}`)
        msg.reply(`Added reaction ${args[3]} to the message`)
        break
      default:
        msg.reply(
          "You need to provide all the arguments *(eg. channelID,messageID,emoji,roleID(optional))*"
        )
        break
    }
  },
}
