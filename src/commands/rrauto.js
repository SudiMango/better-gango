const { MessageEmbed } = require("discord.js")
const dictionary = require("../features/dictionary.js")

module.exports = {
  name: "rrauto",
  description: "auto reaction role cmd",
  type: "admin",
  async execute(msg, args, client) {
    let foundInText = await dictionary(msg)

    if (foundInText) return

    if (!msg.member.permissions.has("ADMINISTRATOR"))
      return msg.reply("U don't have admin perms bozo 😂")

    switch (args.length) {
      case 1:
        const reactionEmbed1 = new MessageEmbed()
          .setTitle(
            "**These are the roles that you can assign to yourself! (Part 1)**\n----------------------------------------ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ\nㅤ"
          )
          .addFields(
            {
              name: "Sneak peaks - 👀",
              value:
                "The 'sneak peaks' role pings you every time I release a new sneak peak for my games!\nㅤ",
              inline: false,
            },
            {
              name: "Game updates - 💥",
              value:
                "The 'game updates' role pings you every time there is a new update released in my games!\nㅤ",
              inline: false,
            },
            {
              name: "Game developer - 💻",
              value:
                "The 'game developer' role gives you access to the super secret chat made only for game developers and allows you to work with and help other game developers!\nㅤ",
              inline: false,
            },
            {
              name: "Gamer - 🎮",
              value:
                "The 'gamer' role is for the gamers in this community!\nㅤ",
              inline: false,
            },
            {
              name: "Looking for group - 👪",
              value:
                "The 'looking for group' role is for people looking to team up for things like gaming, game development, etc!\nㅤ",
              inline: false,
            }
          )
          .setFooter({
            text: "Page 1",
            iconURL:
              "https://cdn.discordapp.com/attachments/972777349105991704/973143133263134770/imcool.jpeg",
          })
          .setColor("#FFFF00")
          .setTimestamp()

        let newEmbed = await msg.channel.send({ embeds: [reactionEmbed1] })
        await newEmbed.react("👀")
        await newEmbed.react("💥")
        await newEmbed.react("💻")
        await newEmbed.react("🎮")
        await newEmbed.react("👪")

        let sneakPeaksRole = await msg.guild.roles.fetch("974333625548042272")
        let gameUpdatesRole = await msg.guild.roles.fetch("974333654086062100")
        let gameDevRole = await msg.guild.roles.fetch("974333687711805472")
        let gamerRole = await msg.guild.roles.fetch("974333967526416445")
        let lfgRole = await msg.guild.roles.fetch("974333996731338822")

        const channel = "974336033950933012"

        client.on("messageReactionAdd", async (reaction, user) => {
          if (reaction.message.partial) await reaction.message.fetch()
          if (reaction.partial) await reaction.fetch()
          if (user.bot) return
          if (!reaction.message.guild) return

          if (reaction.message.channel.id === channel) {
            let myMember = await reaction.message.guild.members.fetch(user.id)
            switch (reaction.emoji.name) {
              case "👀":
                myMember.roles.add(sneakPeaksRole)
                break
              case "💥":
                myMember.roles.add(gameUpdatesRole)
                break
              case "💻":
                myMember.roles.add(gameDevRole)
                break
              case "🎮":
                myMember.roles.add(gamerRole)
                break
              case "👪":
                myMember.roles.add(lfgRole)
                break
            }
          }
        })

        client.on("messageReactionRemove", async (reaction, user) => {
          if (reaction.message.partial) await reaction.message.fetch()
          if (reaction.partial) await reaction.fetch()
          if (user.bot) return
          if (!reaction.message.guild) return

          if (reaction.message.channel.id === channel) {
            let myMember = await reaction.message.guild.members.fetch(user.id)
            switch (reaction.emoji.name) {
              case "👀":
                myMember.roles.remove(sneakPeaksRole)
                break
              case "💥":
                myMember.roles.remove(gameUpdatesRole)
                break
              case "💻":
                myMember.roles.remove(gameDevRole)
                break
              case "🎮":
                myMember.roles.remove(gamerRole)
                break
              case "👪":
                myMember.roles.remove(lfgRole)
                break
            }
          }
        })
        break
      default:
        msg.reply("that aint a command bruh 💀")
        break
    }
  },
}
