const schema = require("../database/guildConfig.js")

module.exports = {
  name: "unmute",
  description: "unmute cmd",
  async execute(msg, args, muteRole) {
    const configFile = schema.findOne({ GuildID: msg.guildId })

    switch (args.length) {
      case 1:
        msg.reply("You didn't tell me who to unmute bruh 💀")
        break
      case 2:
        let target = msg.mentions.users.first()
        if (target) {
          if (muteRole === "") {
            return msg.reply(
              "No muted role set for this server. Please set a muted role first."
            )
          }

          let role = await msg.guild.roles.fetch(muteRole)

          let targetMember = msg.guild.members.cache.get(target.id)

          if (targetMember.user.id === "972776210075619398")
            return msg.reply("im not even muted bozo 😂")

          if (!targetMember.roles.cache.has(muteRole))
            return msg.reply("that person isnt even muted bruh")

          targetMember.roles.remove(role)

          msg.reply(`<@${targetMember.user.id}> has been unmuted.`)
        } else {
          msg.reply("Can't find that member.")
        }
        break
      default:
        msg.reply("that aint a command bruh 💀")
        break
    }
  },
}
