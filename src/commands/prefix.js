const schema = require("../database/guildConfig.js")

module.exports = {
  name: "prefix",
  description: "Check and change bot prefix",

  async execute(msg, args, prefix) {
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
