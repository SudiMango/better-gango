const mongoose = require("mongoose")
const colors = require("colors")
const fs = require("fs")

async function findCommands(directory, client) {
  const files = fs.readdirSync(directory, { withFileTypes: true })
  files.forEach((file) => {
    const name = file.name
    if (file.isDirectory()) {
      findCommands(`${directory}/${name}`, client)
    } else if (name.endsWith(".js")) {
      const command = require(`../../${directory}/${name}`)
      client.commands.set(command.name, command)
    }
  })
}

module.exports = async (client) => {
  // Connect to database
  try {
    await mongoose.connect(process.env.MONGO_URI, { keepAlive: true })
    console.log("[DB] Connected succesfully!".green)
  } catch (error) {
    console.log("[DB] Failed to connect:".red, error)
  }

  // Set commands
  findCommands("src/commands", client)

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
