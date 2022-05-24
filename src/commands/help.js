const { MessageEmbed } = require("discord.js")
const dictionary = require("../features/dictionary.js")

module.exports = {
  name: "help",
  description: "Lets you access the better gango help docs",
  type: "simple",
  async execute(msg, args, client) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    switch (args.length) {
      case 1:
        const firstPage = new MessageEmbed()
          .setTitle(
            "**better gango || help**\n----------------------------------------ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ"
          )
          .addField(
            "**USEFUL LINKS:**",
            "[Discord](https://discord.gg/x3kXyCJxVX)\n[Youtube](https://www.youtube.com/c/mangodev)\n[Twitter](https://twitter.com/SudiMango)\n[Roblox profile](https://www.roblox.com/users/2029953356/profile)\n[Roblox group](https://www.roblox.com/groups/11320081/MangoGango)\nㅤ",
            false
          )
          .addField(
            "**Default prefix**",
            "The default prefix for better gango is '**;**'.\nㅤ"
          )
          .addField(
            "**Simple commands**",
            "React with the emoji below to access the next page\nㅤ"
          )
          .setFooter({
            text: "Page 1",
            iconURL:
              "https://cdn.discordapp.com/attachments/972777349105991704/973143133263134770/imcool.jpeg",
          })
          .setColor("#FFFF00")
          .setTimestamp()

        const secondPage = new MessageEmbed()
          .setTitle(
            "**better gango || help**\n----------------------------------------ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ"
          )
          .addFields(
            {
              name: "Simple commands",
              value:
                "List of simple commands that better gango offers. **Type `;{command name}` for more info about the command.**\nㅤ",
              inline: false,
            },
            {
              name: ";help",
              value: "Lets you access the better gango help docs.",
              inline: false,
            },
            { name: ";ping", value: "Responds with pong.", inline: false },
            { name: ";bing", value: "Responds with bong.", inline: false },
            { name: ";beep", value: "Responds with boop.\nㅤ", inline: false }
          )
          .addField(
            "**Advanced commands**",
            "React with the emoji below to access the next page\nㅤ"
          )
          .setFooter({
            text: "Page 2",
            iconURL:
              "https://cdn.discordapp.com/attachments/972777349105991704/973143133263134770/imcool.jpeg",
          })
          .setColor("#FFFF00")
          .setTimestamp()

        const thirdPage = new MessageEmbed()
          .setTitle(
            "**better gango || help**\n----------------------------------------ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ"
          )
          .addFields(
            {
              name: "Advanced commands",
              value:
                "List of advanced commands that better gango offers. **Type `;help {command name}` for more info about the command.**\nㅤ",
              inline: false,
            },
            {
              name: ";inspire",
              value: "Inspires you with an inspirational quote!",
              inline: false,
            },
            {
              name: ";stalker",
              value:
                "Creep someone out by telling them their age, gender, and living place anonymously!",
              inline: false,
            },
            {
              name: ";8ball",
              value: "Make the bot answer a yes or no question for you!",
              inline: false,
            },
            {
              name: ";meme",
              value: "Look at memes from the r/dankmemes subreddit!\nㅤ",
              inline: false,
            }
          )
          .addField(
            "**Admin commands**",
            "React with the emoji below to access the next page\nㅤ"
          )
          .setFooter({
            text: "Page 3",
            iconURL:
              "https://cdn.discordapp.com/attachments/972777349105991704/973143133263134770/imcool.jpeg",
          })
          .setColor("#FFFF00")
          .setTimestamp()

        const fourthPage = new MessageEmbed()
          .setTitle(
            "**better gango || help**\n----------------------------------------ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ"
          )
          .addFields(
            {
              name: "Admin commands",
              value:
                "List of admin commands that better gango offers. **Type `;help {command name}` for more info about the command.**\nㅤ",
              inline: false,
            },
            {
              name: ";prefix",
              value: "Check/change the prefix for the bot.",
              inline: false,
            },
            {
              name: ";bannedwords",
              value: "Lets you ban words in your server.",
              inline: false,
            },
            {
              name: ";addreaction",
              value:
                "Adds reactions/reaction role to any message that you want.",
              inline: false,
            },
            {
              name: ";rrauto",
              value: `Adds an embeded reaction role msg *(contact @mangongus#6969 to customise it)*`,
              inline: false,
            },
            {
              name: ";embed",
              value: `Lets you send an embedded message *(contact @mangongus#6969 to customise it)*`,
              inline: false,
            },
            {
              name: ";purge",
              value: "Lets you purge messages.",
              inline: false,
            },
            {
              name: ";mute",
              value: "Lets you mute members of the server.",
              inline: false,
            },
            {
              name: ";unmute",
              value: "Lets you unmute muted members of the server.\nㅤ",
              inline: false,
            },
            {
              name: ";kick",
              value: "Lets you kick members of the server.\nㅤ",
              inline: false,
            },
            {
              name: ";ban",
              value: "Lets you ban members of the server.\nㅤ",
              inline: false,
            },
            {
              name: ";unban",
              value: "Lets you unban banned members of the server.\nㅤ",
              inline: false,
            }
          )
          .setFooter({
            text: "Page 4",
            iconURL:
              "https://cdn.discordapp.com/attachments/972777349105991704/973143133263134770/imcool.jpeg",
          })
          .setColor("#FFFF00")
          .setTimestamp()

        const embedTable = [firstPage, secondPage, thirdPage, fourthPage]
        let i = 0

        function getList(i) {
          return embedTable[i]
        }

        let newEmbed = await msg.channel.send({ embeds: [firstPage] })
        newEmbed.react("⏮️")
        newEmbed.react("⏭️")

        let filter = (reaction, user) => user.id !== client.user.id
        let collector = newEmbed.createReactionCollector({
          filter,
          time: 60000,
        })

        collector.on("collect", function (reaction, user) {
          console.log(`${user.tag} reacted with ${reaction.emoji.name}.`)
          reaction.users.remove(user.id)

          if (user.id !== msg.author.id) return

          if (reaction.emoji.name === "⏭️" && i < embedTable.length - 1) {
            i = i + 1
            const embedToEdit = getList(i)
            if (embedToEdit !== undefined) {
              newEmbed.edit({ embeds: [embedToEdit] })
            }
          } else if (reaction.emoji.name === "⏮️" && i > 0) {
            i = i - 1
            const embedToEdit = getList(i)
            if (embedToEdit !== undefined) {
              newEmbed.edit({ embeds: [embedToEdit] })
            }
          }
          console.log(i)
        })

        collector.on("end", function (collected) {
          console.log("COLLECTED: " + collected.size)
        })
        break
      case 2:
        await dictionary.AdvHelp(client, msg.channel, args[1], msg)
        break
      default:
        msg.reply("that aint a command bruh 💀")
        break
    }
  },
}

//\u200B
//ㅤ

// .then(newmessage => {
//       setTimeout(function() {
//         newmessage.edit({ embeds: [secondPage] })
//       }, 3000)
//     })
