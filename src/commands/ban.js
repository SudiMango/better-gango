module.exports = {
  name: "ban",
  description: "ban cmd",
  async execute(msg, args) {
    if (!msg.member.permissions.has("BAN_MEMBERS"))
      return msg.reply("U don't have ban perms bozo 😂")

    if (args.length === 1) {
      msg.reply("You didn't tell me who to ban bruh 💀")
      return
    }

    let reasonTable = args.splice(2)
    let banReason = reasonTable.join(" ")

    console.log(banReason)

    let target = args[1]

    if (!target) return msg.reply("User not found")

    if (target.startsWith("<@") && target.endsWith(">")) {
      try {
        let new1 = target.replace("<@", "")
        let new2 = new1.replace(">", "")
        let targetMember = await msg.guild.members.fetch(new2)

        if (new2 === msg.author.id) return msg.reply("U wanna ban yourself 🤨")

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
        return msg.reply("User not found")
      }
    } else {
      try {
        let targetMember = await msg.guild.members.fetch(target)

        if (target === msg.author.id)
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
        return msg.reply("User not found")
      }
    }
  },
}
