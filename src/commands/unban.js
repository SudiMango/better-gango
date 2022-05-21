module.exports = {
  name: "unban",
  description: "unban cmd",
  async execute(msg, args, client) {
    if (!msg.member.permissions.has("BAN_MEMBERS"))
      return msg.reply("U don't have ban perms bozo 😂")

    if (args.length === 1) {
      msg.reply("You didn't tell me who to unban bruh 💀")
      return
    }

    let target = args[1]

    if (target) {
      try {
        let fetchBans = await msg.guild.bans.fetch()

        fetchBans.forEach((banned) => {
          if (banned.user.id === target) {
            let reasonTable = args.splice(2)
            let unbanReason = reasonTable.join(" ")

            if (!unbanReason) {
              msg.guild.members.unban(banned.user.id)
              return msg.reply(
                `${banned.user.tag} has been unbanned. Reason: None`
              )
            } else {
              msg.guild.members.unban(banned.user.id, unbanReason)
              return msg.reply(
                `${banned.user.tag} has been unbanned. Reason: ${unbanReason}`
              )
            }
          } else {
            return msg.reply("Couldn't find banned user.")
          }
        })
      } catch (err) {
        return msg.reply("Couldn't find banned user.")
      }
    }
  },
}
