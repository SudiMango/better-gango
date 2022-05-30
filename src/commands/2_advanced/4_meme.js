const fetch = require("node-fetch")
const { MessageEmbed } = require("discord.js")
const dictionary = require("../../features/dictionary.js")

module.exports = {
  name: "meme",
  description: "Get a random meme from the r/dankmemes subreddit!",
  type: "Advanced",
  async execute(msg, args, client, prefix, bannedWords, muteRole) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    switch (args.length) {
      case 1:
        let data = await fetch(
          "http://meme-api.herokuapp.com/gimme/dankmemes"
        ).then((res) => res.json())

        const newEmbed = new MessageEmbed()
          .setTitle(data.title)
          .setURL(data.postLink)
          .setColor("#FFFF00")
          .setFooter(data.ups + " upvotes")
          .setTimestamp()
          .setImage(data.url)
          .setAuthor(data.author)

        msg.channel.send({ embeds: [newEmbed] })
        break
      default:
        msg.reply("that aint a command bruh 💀")
        break
    }
  },
}
