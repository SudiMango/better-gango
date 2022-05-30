// Imports
const { Client, Collection, Intents } = require("discord.js")
const welcomeMsg = require("./features/welcomeMessage.js")
const ready = require("./features/ready.js")
const message = require("./features/message.js")
const guildMemberAdd = require("./features/guildMemberAdd.js")
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
client.once("ready", async () => {
  ready(client)
})

// Member joining
client.on("guildMemberAdd", async (member) => {
  welcomeMsg(member)
  guildMemberAdd(client, member)
})

client.on("messageCreate", async (msg) => {
  message(msg, client)
})

// Login
client.login(process.env.TOKEN)

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
