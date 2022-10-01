const mongoose = require("mongoose")

let guildConfig = new mongoose.Schema({
  GuildID: {
    type: String,
    unique: true,
    required: true,
  },
  Prefix: {
    type: String,
  },
  BannedWords: [String],
  MuteRole: {
    type: String,
  },
})

module.exports = mongoose.model("guildConfig", guildConfig)
