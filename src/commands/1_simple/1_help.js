const { MessageEmbed } = require("discord.js")
const dictionary = require("../../features/dictionary.js")
const fs = require("fs")

function makeEmbed(
  embed,
  pageNo,
  dirData,
  dirIndex,
  totalPages,
  dirData2,
  dirIndex2
) {
  let type = null
  let nextType = null
  fs.readdirSync(dirData).forEach((newCommand) => {
    let file = require(`${dirIndex}/${newCommand}`)
    type = file.type
  })
  if (dirData2 && dirIndex2) {
    fs.readdirSync(dirData2).forEach((newCommand) => {
      let file = require(`${dirIndex2}/${newCommand}`)
      nextType = file.type
    })
  }
  embed
    .setTitle(
      "**better gango || help**\n----------------------------------------ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ"
    )
    .setColor("#FFFF00")
    .setFooter({
      text: `Page ${pageNo}/${totalPages + 1}`,
      iconURL:
        "https://cdn.discordapp.com/attachments/972777349105991704/973143133263134770/imcool.jpeg",
    })
    .setTimestamp()
    .addField(
      `${type} commands`,
      `List of ${type} commands that better gango offers. Type **;help {command name}** for more info about the command.\nㅤ`,
      false
    )
  const data = fs.readdirSync(dirData)
  const newData1 = data.splice(0, data.length - 1)
  const newData2 = data.splice(-1)

  for (const newCommand of newData1) {
    let file = require(`${dirIndex}/${newCommand}`)
    embed.addField(
      `;${newCommand.split("_")[1].replace(".js", "")}`,
      `${file.description}`,
      false
    )
  }
  for (const newCommand of newData2) {
    let file = require(`${dirIndex}/${newCommand}`)
    embed.addField(
      `;${newCommand.split("_")[1].replace(".js", "")}`,
      `${file.description}\nㅤ`,
      false
    )
  }
  if (dirData2 && dirIndex2) {
    embed.addField(
      `**${nextType} commands**`,
      "React with the emoji below to access the next page\nㅤ"
    )
  } else {
    embed.addField(
      "**Thanks for choosing better gango!**",
      "----------------------------------------"
    )
  }
}

module.exports = {
  name: "help",
  description: "Lets you access the better gango help docs",
  type: "Simple",
  async execute(msg, args, client, prefix, bannedWords, muteRole) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    switch (args.length) {
      case 1:
        let dirData = []
        let dirIndex = []

        fs.readdirSync("src/commands").forEach((dir) => {
          dirIndex.push(`../../commands/${dir}`)
          dirData.push(`src/commands/${dir}`)
        })

        const firstEmbed = new MessageEmbed()
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
            text: "Page 1/6",
            iconURL:
              "https://cdn.discordapp.com/attachments/972777349105991704/973143133263134770/imcool.jpeg",
          })
          .setColor("#FFFF00")
          .setTimestamp()
        const secondEmbed = new MessageEmbed()
        makeEmbed(
          secondEmbed,
          2,
          dirData[0],
          dirIndex[0],
          dirData.length,
          dirData[1],
          dirIndex[1]
        )
        const thirdEmbed = new MessageEmbed()
        makeEmbed(
          thirdEmbed,
          3,
          dirData[1],
          dirIndex[1],
          dirData.length,
          dirData[2],
          dirIndex[2]
        )
        const fourthEmbed = new MessageEmbed()
        makeEmbed(
          fourthEmbed,
          4,
          dirData[2],
          dirIndex[2],
          dirData.length,
          dirData[3],
          dirIndex[3]
        )
        const fifthEmbed = new MessageEmbed()
        makeEmbed(
          fifthEmbed,
          5,
          dirData[3],
          dirIndex[3],
          dirData.length,
          dirData[4],
          dirIndex[4]
        )
        const sixthEmbed = new MessageEmbed()
        makeEmbed(
          sixthEmbed,
          6,
          dirData[4],
          dirIndex[4],
          dirData.length,
          dirData[5],
          dirIndex[5]
        )

        const embedTable = [
          firstEmbed,
          secondEmbed,
          thirdEmbed,
          fourthEmbed,
          fifthEmbed,
          sixthEmbed,
        ]
        let i = 0

        function getList(i) {
          return embedTable[i]
        }

        let newEmbed = await msg.channel.send({
          embeds: [firstEmbed],
        })
        newEmbed.react("⏮️")
        newEmbed.react("⏭️")

        let filter = (reaction, user) => user.id !== client.user.id
        let collector = newEmbed.createReactionCollector({
          filter,
          time: 120000,
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
