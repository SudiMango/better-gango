module.exports = {
  name: "ban",
  description: "ban cmd",
  async execute(msg, args, client) {
    if (!msg.member.permissions.has("BAN_MEMBERS"))
      return msg.reply("U don't have ban perms bozo 😂")

    if (args.length === 1) {
      msg.reply("You didn't tell me who to ban bruh 💀")
      return
    }

    let reasonTable = args.splice(2)
    let banReason = reasonTable.join(" ")

    console.log(banReason)

    let targetByMention = msg.mentions.users.first()

    if (targetByMention) {
      let targetMember = msg.guild.members.cache.get(targetByMention.id)

      console.log(targetMember)

      if (!targetMember) return msg.reply("User not found")

      if (targetByMention.id === msg.author.id)
        return msg.reply("U wanna ban yourself 🤨")

      if (targetMember.permissions.has("ADMINISTRATOR"))
        return msg.reply("That person has admin, I can't ban them")

      await targetMember.ban({ reason: banReason })
      if (!banReason) {
        return msg.reply(
          `${targetMember.user.tag} has been banned. Reason: None`
        )
      } else {
        return msg.reply(
          `${targetMember.user.tag} has been banned. Reason: ${banReason}`
        )
      }
    } else if (!targetByMention) {
      try {
        let targetMember = await msg.guild.members.fetch(args[1])

        if (args[1] === msg.author.id)
          return msg.reply("U wanna ban yourself 🤨")

        if (targetMember.permissions.has("ADMINISTRATOR"))
          return msg.reply("That person has admin, I can't ban them")

        await targetMember.ban({ reason: banReason })
        if (!banReason) {
          return msg.reply(
            `${targetMember.user.tag} has been banned. Reason: None`
          )
        } else {
          return msg.reply(
            `${targetMember.user.tag} has been banned. Reason: ${banReason}`
          )
        }
      } catch (err) {
        msg.reply("User not found")
      }
    }
  },
}
