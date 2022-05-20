module.exports = {
  name: "kick",
  description: "kick cmd",
  async execute(msg, args) {
    if (!msg.member.permissions.has("KICK_MEMBERS"))
      return msg.reply("U don't have kick perms bozo 😂")

    if (args.length === 1) {
      msg.reply("You didn't tell me who to kick bruh 💀")
      return
    }

    let reasonTable = args.splice(2)
    let reason = reasonTable.join(" ")

    console.log(reason)

    let target = msg.mentions.users.first()

    if (!target) return msg.reply("Please tag a user")

    if (target) {
      let targetMember = msg.guild.members.cache.get(target.id)

      if (!targetMember) return msg.reply("User not found")

      if (target.id === msg.author.id)
        return msg.reply("U wanna kick yourself 🤨")

      if (targetMember.permissions.has("ADMINISTRATOR"))
        return msg.reply("That person has admin, I can't kick them")

      await targetMember.kick()
      if (!reason) {
        return msg.reply(`${target} has been kicked. Reason: None`)
      } else {
        return msg.reply(`${target} has been kicked. Reason: ${reason}`)
      }
    }
  },
}
