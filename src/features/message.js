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
  console.log(command)

  // Calling commands
  try {
    switch (command) {
      // Calling simple commands
      case "help":
        client.commands.get("help").execute(msg, args, client)
        break
      case "ping":
        client.commands.get("ping").execute(msg, args, client)
        break
      case "bing":
        client.commands.get("bing").execute(msg, args)
        break
      case "beep":
        client.commands.get("beep").execute(msg, args)
        break

      // Calling advanced commands
      case "inspire":
        client.commands.get("inspire").execute(msg, args)
        break
      case "demotivate":
        client.commands.get("demotivate").execute(msg, args)
        break
      case "stalker":
        client.commands.get("stalker").execute(msg, args, client)
        break
      case "8ball":
        client.commands.get("8ball").execute(msg, args, client)
        break
      case "meme":
        client.commands.get("meme").execute(msg, args, client)
        break
      case "prefix":
        client.commands.get("prefix").execute(msg, args, prefix)
        break

      // Calling game commands
      case "bal":
        client.commands.get("bal").execute(msg, args)
        break
      case "beg":
        client.commands.get("beg").execute(msg, args)
        break

      // Calling admin commands
      case "bannedwords":
        client.commands
          .get("bannedwords")
          .execute(msg, args, client, bannedWords)
        break
      case "addreaction":
        client.commands.get("addreaction").execute(msg, args)
        break
      case "rrauto":
        client.commands.get("rrauto").execute(msg, args, client)
        break
      case "embed":
        client.commands.get("embed").execute(msg, args, msg.author.tag)
        break
      case "purge":
        client.commands.get("purge").execute(msg, args, client)
        break
      case "mute":
        client.commands.get("mute").execute(msg, args, muteRole, client)
        break
      case "unmute":
        client.commands.get("unmute").execute(msg, args, muteRole, client)
        break
      case "setwelcome":
        client.commands.get("setwelcome").execute(msg, args, client)
        break
      case "kick":
        client.commands.get("kick").execute(msg, args, client)
        break
      case "ban":
        client.commands.get("ban").execute(msg, args, client)
        break
      case "unban":
        client.commands.get("unban").execute(msg, args, client)
        break
      case "rr":
        client.commands.get("rr").execute(msg, args, client)
        break
    }
  } catch (error) {
    // Catch error
    msg.reply("an unknown error has occured")
    console.log(error)
  }
}
