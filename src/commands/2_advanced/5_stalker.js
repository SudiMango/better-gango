const dictionary = require("../../features/dictionary.js")

module.exports = {
  name: "stalker",
  description:
    "Creep someone out by telling them their age, gender, and living place anonymously 👀",
  type: "Advanced",
  async execute(msg, args, client, prefix, bannedWords, muteRole) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    switch (args.length) {
      case 1:
        await dictionary.AdvHelp(client, msg.channel, args[0], msg)
        break
      case 2:
        msg.reply(
          "You need to provide all the proper arguments *(eg. ;stalker 16 male Ethiopia @user)*"
        )
        break
      case 3:
        msg.reply(
          "You need to provide all the proper arguments *(eg. ;stalker 16 male Ethiopia @user)*"
        )
        break
      case 4:
        msg.reply(
          "You need to provide all the proper arguments *(eg. ;stalker 16 male Ethiopia @user)*"
        )
        break
      case 5:
        let target = msg.mentions.users.first()

        if (!target) return msg.reply("Can't find that member.")

        let targetMember = msg.guild.members.cache.get(target.id)

        msg.channel.send(
          `${targetMember} So you are a ${args[1]} year old ${args[2]} living in ${args[3]} 😈`
        )
        msg.delete()
        break
      default:
        msg.reply(
          "You need to provide all the proper arguments *(eg. ;stalker 16 male Ethiopia @user)*"
        )
        break
    }
  },
}
