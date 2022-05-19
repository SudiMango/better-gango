module.exports = {
  name: "purge",
  description: "purge cmd",
  async execute(msg, args) {
    switch (args.length) {
      case 1:
        msg.reply(
          "You didn't enter the amount of messages that u wanna clear bozo"
        )
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
