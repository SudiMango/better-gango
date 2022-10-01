const schema = require("../database/guildConfig.js")
const currencySchema = require("../database/currencySchema.js")

async function funnyServerConfigs(msg) {
  let target = msg.mentions.users.first()

  if (target) {
    let targetMember = msg.guild.members.cache.get(target.id)

    if (targetMember.user.id === "972776210075619398") {
      msg.reply("https://tenor.com/view/discord-gif-19091877")
    }
  }

  if (msg.content.includes("💀")) {
    msg.reply(
      "https://cdn.discordapp.com/attachments/974576242055577620/977457066362953779/6spq6nB7q7.gif"
    )
  }
}

async function banWords(msg, bannedWords) {
  let foundInText = false
  for (var i in bannedWords) {
    if (msg.content.toLowerCase().includes(bannedWords[i].toLowerCase())) {
      foundInText = true
    }
  }

  if (foundInText) {
    if (!msg.member.permissions.has("ADMINISTRATOR")) {
      msg.delete()
      msg.channel
        .send(`NO BAD WORDS <@${msg.author.id}>`)
        .then((msgToDelete) => {
          setTimeout(() => msgToDelete.delete(), 4000)
        })
    }
  }
}

module.exports = async (msg, client) => {
  // If message is sent by bot then return
  if (msg.author.bot) return

  // Guild configs
  const configFile = await schema.findOne({ GuildID: msg.guildId })

  // Funny server configs
  funnyServerConfigs(msg)

  // Server configs

  // Banned words
  let bannedWords = []
  if (configFile && configFile.BannedWords) {
    bannedWords = configFile.BannedWords
  }
  banWords(msg, bannedWords)

  // Prefix
  let prefix = ";"
  if (configFile && configFile.Prefix) {
    prefix = configFile.Prefix
  }
  if (!msg.content.startsWith(prefix)) return

  let profileData
  try {
    profileData = await currencySchema.findOne({ UserID: msg.author.id })
    if (!profileData) {
      let profile = await currencySchema.create({
        UserID: msg.author.id,
        ServerID: msg.guild.id,
        Mangoes: 20,
        Bank: 0,
        BankLimit: 500,
      })
      profile.save()
    }
  } catch (err) {
    console.log(err)
  }

  // Check for muted role
  let muteRole = ""
  if (configFile && configFile.MuteRole) {
    muteRole = configFile.MuteRole
  }

  // Arguments
  let args = msg.content.slice(prefix.length).split(" ")
  console.log(args)

  // Get command
  let command = args[0].toLowerCase()

  const cmd =
    client.commands.get(command) ||
    client.commands.find((a) => a.aliases && a.aliases.includes(command))

  // Calling commands
  if (cmd) {
    try {
      cmd.execute(msg, args, client, prefix, bannedWords, muteRole)
    } catch (err) {
      msg.reply("an unknown error has occured")
      console.log(error)
    }
  }
}
