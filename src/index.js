// Imports
const fs = require("fs")
const { Client, Collection, Intents, MessageEmbed } = require("discord.js")
const mongoose = require("mongoose")
const colors = require("colors")
const schema = require("./database/guildConfig.js")
const welcomeSchema = require("./database/welcome-config.js")
require("dotenv").config()

// Client
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
})

// Configs

// Command handler
client.commands = new Collection()

// Events

// Client is ready
client.on("ready", async () => {
  // Connect to database
  try {
    await mongoose.connect(process.env.MONGO_URI, { keepAlive: true })
    console.log("[DB] Connected succesfully!".green)
  } catch (error) {
    console.log("[DB] Failed to connect:".red, error)
  }

  // Set commands
  const commandFiles = fs
    .readdirSync("src/commands")
    .filter((file) => file.endsWith(".js"))

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
  }

  // Set presence
  client.user.setPresence({
    status: "idle",
    activities: [
      {
        name: ";help | Under development",
      },
    ],
  })

  // Client is ready!
  console.log(`Logged in as ${client.user.tag}!`.green)
})

// Member joining
client.on("guildMemberAdd", async (member) => {
  const welcomeData = {}
  const { guild, id } = member

  let data = welcomeData[guild.id]

  if (!data) {
    const results = await welcomeSchema.findOne({ GuildID: guild.id })
    if (!results) {
      return console.log("no results found")
    }

    const channelId = results.ChannelID
    const enabled = results.Enabled

    // const { channelId, enabled } = results
    const channel = guild.channels.cache.get(channelId)
    data = welcomeData[guild.id] = [channel, enabled]

    if (!data[1] || data[1] === false) {
      return console.log("welcome msg disabled")
    }
  }

  const welcomeEmbed = new MessageEmbed()
    .setDescription(
      `**--------------------**\nWelcome to the **${member.guild.name}** community ${member.user.tag}! There are now *${member.guild.memberCount} members* in this server! Enjoy your stay here!\n**--------------------**\nCheck the <#973963670176563290> channel to gain full access to the server! 😁
      `
    )
    .setAuthor(
      `Welcome, ${member.user.username}!`,
      "https://cdn.discordapp.com/attachments/972777349105991704/975278772221775932/809385119236096020.gif"
    )
    .setThumbnail(member.displayAvatarURL())
    .setColor("#FFFF00")
  data[0].send({ embeds: [welcomeEmbed] })
  // member.guild.channels.cache.get(channel).send({ embeds: [welcomeEmbed] })
})

// Client is ready
client.on("messageCreate", async (msg) => {
  // If message is sent by bot then return
  if (msg.author.bot) return

  // Server configs

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

  // Auto reactions in show off channel
  let showOffChannel = "972777349105991704"

  // if (msg.channel.id === showOffChannel) {
  //   msg.react("👍")
  //   msg.react("👎")
  //   msg.react("🤷‍♂️")
  // }

  // Delete banned words
  const configFile = await schema.findOne({ GuildID: msg.guildId })

  let bannedWords = []
  if (configFile && configFile.BannedWords) {
    bannedWords = configFile.BannedWords
  }

  let foundInText = false
  for (var i in bannedWords) {
    if (msg.content.toLowerCase().includes(bannedWords[i].toLowerCase())) {
      foundInText = true
    }
  }

  if (foundInText) {
    if (!msg.member.roles.cache.has("973962952032026654")) {
      msg.delete()
      msg.channel
        .send(`NO BAD WORDS <@${msg.author.id}>`)
        .then((msgToDelete) => {
          setTimeout(() => msgToDelete.delete(), 4000)
        })
    }
  }

  // Commands

  // Check if command starts with prefix
  let prefix = ";"
  if (configFile && configFile.Prefix) {
    prefix = configFile.Prefix
  }
  if (!msg.content.startsWith(prefix)) return

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
        client.commands.get("stalker").execute(msg, args)
        break
      case "8ball":
        client.commands.get("8ball").execute(msg, args)
        break
      case "meme":
        client.commands.get("meme").execute(msg, args, client)
        break
      case "prefix":
        client.commands.get("prefix").execute(msg, args, prefix)
        break

      // Calling admin commands
      case "bannedwords":
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
          msg.reply("u dont have admin bozo")
          return
        }
        client.commands.get("bannedwords").execute(msg, args, bannedWords)
        break
      case "addreaction":
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
          msg.reply("u dont have admin bozo")
          return
        }
        client.commands.get("addreaction").execute(msg, args)
        break
      case "rrauto":
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
          msg.reply("u dont have admin bozo")
          return
        }
        client.commands.get("rrauto").execute(msg, args, client)
        break
      case "embed":
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
          msg.reply("u dont have admin bozo")
          return
        }
        client.commands.get("embed").execute(msg, args, msg.author.tag)
        break
      case "purge":
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
          msg.reply("u dont have admin bozo")
          return
        }
        client.commands.get("purge").execute(msg, args)
        break
      case "mute":
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
          msg.reply("u dont have admin bozo")
          return
        }
        client.commands.get("mute").execute(msg, args, muteRole)
        break
      case "unmute":
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
          msg.reply("u dont have admin bozo")
          return
        }
        client.commands.get("unmute").execute(msg, args, muteRole)
        break
      case "setwelcome":
        if (!msg.member.permissions.has("ADMINISTRATOR")) {
          msg.reply("u dont have admin bozo")
          return
        }
        client.commands.get("setwelcome").execute(msg, args)
        break
      case "kick":
        client.commands.get("kick").execute(msg, args)
        break
      case "ban":
        client.commands.get("ban").execute(msg, args)
        break
      case "unban":
        client.commands.get("unban").execute(msg, args, client)
        break
    }
  } catch (error) {
    // Catch error
    msg.reply("an unknown error has occured")
    console.log(error)
  }
})

// Login
client.login(process.env.TOKEN)

// Simple commands:
// - ;help
// - ;ping
// - ;bing
// - ;beep

// Advanced commands:
// - ;inspire
// - ;bruh

// Admin commands:
// - ;bannedwords
// - ;addreaction
// - ;rrauto
// - ;embed
// - ;purge

// Old method
// try {
//   client.commands
//     .get(msg.content.substring(1).split(" ")[0])
//     .execute(msg, args, client, bannedWords)
// } catch (error) {
//   // Catch error
//   msg.reply("an unknown error has occured")
//   console.log(error)
// }
