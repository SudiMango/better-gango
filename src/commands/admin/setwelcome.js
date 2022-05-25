const welcomeSchema = require("../../database/welcome-config.js")
const dictionary = require("../../features/dictionary.js")

module.exports = {
  name: "setwelcome",
  description: "setwelcome message",
  async execute(msg, args) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    if (!msg.member.permissions.has("ADMINISTRATOR"))
      return msg.reply("U don't have admin perms bozo 😂")

    const welcomeConfig = await welcomeSchema.findOne({ GuildID: msg.guildId })
    if (args.length === 1) {
      if (!welcomeConfig) {
        msg.reply(
          `Welcome message channel: None\nWelcome message enabled: false`
        )
      } else if (!welcomeConfig.Enabled) {
        msg.reply(
          `Welcome message channel: <#${welcomeConfig.ChannelID}>\nWelcome message enabled: false`
        )
      } else {
        msg.reply(
          `Welcome message channel: <#${welcomeConfig.ChannelID}>\nWelcome message enabled: ${welcomeConfig.Enabled}`
        )
      }
    }

    if (args.length === 2) {
      if (args[1] === "enable") {
        await welcomeSchema
          .findOneAndUpdate(
            { GuildID: msg.guildId },
            { Enabled: true },
            { upsert: true }
          )
          .catch((err) => {
            console.log(err)
          })
        return msg.reply(`Welcome message enabled: true`)
      } else if (args[1] === "disable") {
        await welcomeSchema
          .findOneAndUpdate(
            { GuildID: msg.guildId },
            { Enabled: false },
            { upsert: true }
          )
          .catch((err) => {
            console.log(err)
          })
        return msg.reply(`Welcome message enabled: false`)
      }

      const target = msg.mentions.channels.first()

      if (!target || target.type !== "GUILD_TEXT") {
        return msg.reply("Please tag a text channel.")
      }

      if (target) {
        await welcomeSchema
          .findOneAndUpdate(
            { GuildID: msg.guildId },
            { ChannelID: target.id },
            { upsert: true }
          )
          .catch((err) => {
            console.log(err)
          })

        msg.reply(`Welcome channel set to <#${target.id}>!`)
      }
    }
  },
}
