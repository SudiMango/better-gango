const schema = require("../../database/guildConfig.js")
const dictionary = require("../../features/dictionary.js")

module.exports = {
  name: "unmute",
  description: "Unmute muted members in server",
  type: "Admin",
  async execute(msg, args, muteRole, client) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    if (!msg.member.permissions.has("ADMINISTRATOR"))
      return msg.reply("U don't have admin perms bozo 😂")

    const configFile = schema.findOne({ GuildID: msg.guildId })

    switch (args.length) {
      case 1:
        await dictionary.AdvHelp(client, msg.channel, args[0], msg)
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
