const dictionary = require("../features/dictionary.js")

module.exports = {
  name: "kick",
  description: "kick cmd",
  type: "admin",
  async execute(msg, args, client) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    if (!msg.member.permissions.has("KICK_MEMBERS"))
      return msg.reply("U don't have kick perms bozo 😂")

    if (args.length === 1) {
      await dictionary.AdvHelp(client, msg.channel, args[0], msg)
      return
    }

    let reasonTable = args.splice(2)
    let kickReason = reasonTable.join(" ")

    console.log(kickReason)

    let target = args[1]

    if (!target) return msg.reply("User not found")

    if (target.startsWith("<@") && target.endsWith(">")) {
      try {
        let new1 = target.replace("<@", "")
        let new2 = new1.replace(">", "")
        let targetMember = await msg.guild.members.fetch(new2)

        if (new2 === msg.author.id) return msg.reply("U wanna kick yourself 🤨")

        if (targetMember.permissions.has("ADMINISTRATOR"))
          return msg.reply("That person has admin, I can't kick them")

        await targetMember.kick(kickReason)
        if (!kickReason) {
          return msg.reply(
            `${targetMember.user.tag} has been kicked. Reason: None`
          )
        } else {
          return msg.reply(
            `${targetMember.user.tag} has been kicked. Reason: ${kickReason}`
          )
        }
      } catch (err) {
        return msg.reply("User not found")
      }
    } else {
      try {
        let targetMember = await msg.guild.members.fetch(target)

        if (target === msg.author.id)
          return msg.reply("U wanna kick yourself 🤨")

        if (targetMember.permissions.has("ADMINISTRATOR"))
          return msg.reply("That person has admin, I can't kick them")

        await targetMember.kick(kickReason)
        if (!kickReason) {
          return msg.reply(
            `${targetMember.user.tag} has been kicked. Reason: None`
          )
        } else {
          return msg.reply(
            `${targetMember.user.tag} has been kicked. Reason: ${kickReason}`
          )
        }
      } catch (err) {
        return msg.reply("User not found")
      }
    }
  },
}
