const fetch = require("node-fetch")
const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "meme",
  description: "meme cmd",
  async execute(msg, args) {
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
