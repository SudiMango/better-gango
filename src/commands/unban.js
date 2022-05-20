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

    if (args[1]) {
      msg.guild.bans.fetch().then((bans) => {
        bans.forEach((banned) => {
          if (banned.user.id === args[1]) {
            let reasonTable = args.splice(2)
            let unbanReason = reasonTable.join(" ")

            let user = client.users.cache.get(args[1])

            if (!unbanReason) {
              msg.guild.members.unban(args[1], unbanReason)
              msg.reply(`${user.tag} has been unbanned. Reason: None`)
            } else {
              msg.guild.members.unban(args[1])
              msg.reply(`${user.tag} has been unbanned. Reason: ${unbanReason}`)
            }
          } else {
            return msg.reply(
              "Couldn't find banned member. Are you sure that you put in the correct user id?"
            )
          }
        })
      })
    }

    // let target = msg.mentions.users.first()

    // if (!target) return msg.reply("Please tag a user")

    // msg.guild.bans.fetch().then((bans) => {
    //   bans.forEach((banned) => {
    //     if (banned.user.id === target) {
    //       msg.guild.members.unban(target, unbanReason)
    //     }
    //   })
    // })

    // if (target) {
    //   let targetMember = msg.guild.members.cache.get(target.id)

    //   if (!targetMember) return msg.reply("User not found")

    //   if (target.id === msg.author.id)
    //     return msg.reply("U wanna ban yourself 🤨")

    //   if (targetMember.permissions.has("ADMINISTRATOR"))
    //     return msg.reply("That person has admin, I can't ban them")

    //   await targetMember.ban({ reason: banReason })
    //   if (!banReason) {
    //     return msg.reply(`${target} has been banned. Reason: None`)
    //   } else {
    //     return msg.reply(`${target} has been banned. Reason: ${banReason}`)
    //   }
    // }
  },
}
