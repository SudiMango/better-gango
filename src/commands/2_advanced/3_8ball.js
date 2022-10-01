const dictionary = require("../../features/dictionary.js")

module.exports = {
  name: "8ball",
  description: "Make the bot answer a yes or no question for you!",
  type: "Advanced",
  async execute(msg, args, client, prefix, bannedWords, muteRole) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    switch (args.length) {
      case 1:
        await dictionary.AdvHelp(client, msg.channel, args[0], msg)
        break
      default:
        let replies = [
          "yes 😃",
          "without a doubt!",
          "concentrate and ask again",
          "maybe...",
          "very doubtful.",
          "no 😂",
          "it's best if u don't know...",
          "of course!",
          "https://cdn.discordapp.com/attachments/589689538956492830/864746702882734100/SPOILER_download_1.jpeg",
          "https://tenor.com/view/watch-yo-tone-tone-watch-your-tone-watch-your-gif-24091847",
          "don't ask me that ever again.",
          "very likely",
          "very unlikely",
          "yeah lmao",
          "no lol",
        ]

        let result = Math.floor(Math.random() * replies.length)
        msg.reply(`${replies[result]}`)
        break
    }
  },
}
