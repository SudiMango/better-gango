const mongoose = require("mongoose")

let rrConfig = new mongoose.Schema({
  GuildID: {
    type: String,
    unique: true,
    required: true,
  },
  ChannelID: [String],
  MessageID: [String],
  Emoji: [String],
  RoleID: [String],
})

module.exports = mongoose.model("rrConfig", rrConfig)
