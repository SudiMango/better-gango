const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "embed",
  description: "embed cmd",
  execute(msg, args, author) {
    switch (args.length) {
      case 1:
        const newEmbed = new MessageEmbed()
          .setTitle("Hello world!")
          .setColor("#FFFF00")
          .setAuthor(`By ${author}`)
          .setDescription("Your mom :rofl:")
          .setImage(
            "https://media.discordapp.net/attachments/944699619496050718/953813696575070258/snapchat.gif"
          )
          .setThumbnail(
            "https://media.discordapp.net/attachments/944699619496050718/953813696575070258/snapchat.gif"
          )
          .setURL(
            "https://media.discordapp.net/attachments/944699619496050718/953813696575070258/snapchat.gif"
          )
          .setTimestamp()
          .addFields(
            { name: "dancing", value: "pegion" },
            { name: "cuh", value: "\u200B" },
            { name: "bru", value: "bruhe", inline: true }
          )
          .setFooter({
            text: "cuh",
            iconURL:
              "https://media.discordapp.net/attachments/944699619496050718/953813696575070258/snapchat.gif",
          })

        msg.channel.send({ embeds: [newEmbed] })
        break
      default:
        msg.reply("that aint a command bruh 💀")
        break
    }
  },
}
