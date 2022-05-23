const mongoose = require("mongoose")
const colors = require("colors")
const fs = require("fs")

module.exports = async (client) => {
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
    const command = require(`../commands/${file}`)
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
}
