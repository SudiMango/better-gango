const schema = require("../../database/guildConfig.js")
const dictionary = require("../../features/dictionary.js")

module.exports = {
  name: "prefix",
  description: "Check and change bot's prefix",
  type: "Management",
  async execute(msg, args, client, prefix, bannedWords, muteRole) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    const configFile = schema.findOne({ GuildID: msg.guildId })

    if (args.length === 1) {
      return msg.reply(
        `Prefix for **${msg.guild.name}** is **${configFile.Prefix ?? prefix}**`
      )
    }

    if (args[1] === "set") {
      let newPrefix = args[2]

      if (!newPrefix) return msg.reply("No prefix provided to set")

      if (newPrefix.length > 5)
        return msg.reply("Prefix length must be less than 5")

      await schema
        .findOneAndUpdate(
          { GuildID: msg.guildId },
          { Prefix: newPrefix },
          { upsert: true }
        )
        .catch((err) => {
          console.log(err)
        })

      await msg.reply(`New prefix set to **${newPrefix}**`)
    }
  },
}
