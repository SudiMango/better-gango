const mongoose = require("mongoose")

let rrConfig = new mongoose.Schema({
  GuildID: {
    type: String,
    unique: true,
    required: true,
  },
  ChannelID: {
    type: String,
    required: true,
  },
  MessageID: {
    type: String,
    required: true,
  },
  Emoji: {
    type: String,
    required: true,
  },
  RoleID: {
    type: String,
    required: true,
  },
  ReactionID: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model("rrConfig", rrConfig)
