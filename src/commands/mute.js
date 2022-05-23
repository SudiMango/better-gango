const ms = require("ms")
const schema = require("../database/guildConfig.js")

module.exports = {
  name: "mute",
  description: "mute cmd",
  async execute(msg, args, muteRole) {
    if (!msg.member.permissions.has("ADMINISTRATOR"))
      return msg.reply("U don't have admin perms bozo 😂")

    const configFile = schema.findOne({ GuildID: msg.guildId })

    if (args.length === 1) {
      msg.reply("You didn't tell me who to mute bruh 💀")
      return
    }

    if (args[1] === "role") {
      if (muteRole === "")
        return msg.reply("No muted role set for this server.")

      return msg.reply(
        `Mute role for **${msg.guild.name}** is <@${
          configFile.MuteRole ?? muteRole
        }>`
      )
    }

    if (args[1] === "set") {
      let muteTag = msg.mentions.roles.first()

      if (muteTag) {
        let newMuteRole = await msg.guild.roles.fetch(muteTag.id)
        if (newMuteRole) {
          await schema
            .findOneAndUpdate(
              { GuildID: msg.guildId },
              { MuteRole: newMuteRole },
              { upsert: true }
            )
            .catch((err) => {
              console.log(err)
            })
          return msg.reply(`Mute role set to ${muteTag}`)
        } else {
          return msg.reply("Role not found")
        }
      } else {
        return msg.reply("Role not found")
      }
    }

    if (args.length > 3) {
      msg.reply("that aint a command bruh 💀")
      return
    }

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
        return msg.reply("u cant mute me bozo 😂")

      if (!args[2]) {
        targetMember.roles.add(role)
        msg.reply(`<@${targetMember.user.id}> has been muted.`)
        return
      }

      let first = args[2].substring(0, args[2].length - 1)
      let last = args[2].charAt(args[2].length - 1)
      let acceptedLasts = ["s", "m", "h", "d", "y"]
      console.log(first + " first", last + " last")

      if (isNaN(first) || first === "")
        return msg.reply("Invalid argument (number)")
      let pass = false
      for (const letter in acceptedLasts) {
        if (args[2].endsWith(acceptedLasts[letter])) {
          pass = true
          break
        }
      }

      if (!pass) return msg.reply("Invalid argument (letter)")

      targetMember.roles.add(role)
      msg.reply(
        `<@${targetMember.user.id}> has been muted for ${ms(ms(args[2]))}.`
      )

      setTimeout(function () {
        targetMember.roles.remove(role)
      }, ms(args[2]))
    } else {
      msg.reply("Can't find that member.")
    }
  },
}
