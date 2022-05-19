module.exports = {
  name: "8ball",
  description: "8ball cmd",
  execute(msg, args) {
    switch (args.length) {
      case 1:
        msg.reply("u forgor to ask me a question 💀")
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
