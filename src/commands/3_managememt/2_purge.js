const dictionary = require("../../features/dictionary.js")

module.exports = {
  name: "purge",
  description: "Bulk delete messages (upto 100 at a time)",
  type: "Management",
  async execute(msg, args, client, prefix, bannedWords, muteRole) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    if (!msg.member.permissions.has("MANAGE_MESSAGES"))
      return msg.reply("U don't have perms to manage messages bozo 😂")

    switch (args.length) {
      case 1:
        await dictionary.AdvHelp(client, msg.channel, args[0], msg)
        break
      case 2:
        if (isNaN(args[1]))
          return msg.reply("Argument needs to be a real number!")

        if (args[1] > 100)
          return msg.reply("Cannot delete over 100 messages at a time!")
        if (args[1] < 1) return msg.reply("You must delete at least 1 message.")

        let msgesToDelete = await msg.channel.messages.fetch({ limit: args[1] })
        msg.channel.bulkDelete(msgesToDelete)

        msg.channel.send(`Purged ${args[1]} messages.`).then((msgToDelete) => {
          setTimeout(() => msgToDelete.delete(), 3000)
        })
        break
      default:
        msg.reply("that aint a command bruh 💀")
        break
    }
  },
}
