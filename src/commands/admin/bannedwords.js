const schema = require("../../database/guildConfig.js")
const dictionary = require("../../features/dictionary.js")

module.exports = {
  name: "bannedwords",
  description: "banned words cmd",
  type: "admin",
  async execute(msg, args, client, bannedWords) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    if (!msg.member.permissions.has("ADMINISTRATOR"))
      return msg.reply("U don't have admin perms bozo 😂")

    const configFile = schema.findOne({ GuildID: msg.guildId })

    switch (args.length) {
      case 1:
        if (!bannedWords.length) {
          msg.reply("No words banned in this server.")
        } else {
          msg.reply(
            `Banned words list: *${configFile.BannedWords ?? bannedWords}*`
          )
        }
        break
      case 2:
        if (args[1] === "add") {
          msg.reply("no words given to add")
        } else if (args[1] === "remove") {
          msg.reply("no words given to remove")
        } else {
          return
        }
        break
      case 3:
        if (args[1] === "add") {
          await schema
            .findOneAndUpdate(
              { GuildID: msg.guildId },
              {
                $addToSet: {
                  BannedWords: args[2],
                },
              },
              { upsert: true }
            )
            .catch((err) => {
              console.log(err)
            })
          if (bannedWords.includes(args[2])) {
            msg.reply("Word is already in list.")
          } else {
            msg.reply(`Added '${args[2]}' to the list of banned words.`)
          }
        } else if (args[1] === "remove") {
          await schema
            .findOneAndUpdate(
              { GuildID: msg.guildId },
              {
                $pull: {
                  BannedWords: args[2],
                },
              },
              { upsert: true }
            )
            .catch((err) => {
              console.log(err)
            })
          if (bannedWords.includes(args[2])) {
            msg.reply(`Removed '${args[2]}' from the list of banned words.`)
          } else {
            msg.reply("Word not found")
          }
        } else {
          return
        }
        break
      default:
        msg.reply("Need to add valid arguments")
        break
    }
  },
}

// const indexOfWord = bannedWords.indexOf(args[2])
// if (indexOfWord == -1) {
//   msg.reply("word not found")
// } else {
//   bannedWords.splice(indexOfWord, 1)
//   msg.reply(`Removed '${args[2]}' from the list of banned words.`)
// }
