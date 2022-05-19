const mongoose = require("mongoose")

const reqString = {
  type: String,
  required: true,
}

let welcomeConfig = new mongoose.Schema({
  GuildID: reqString,
  ChannelID: reqString,
  Enabled: {
    type: Boolean,
    required: true,
  },
})

module.exports = mongoose.model("welcomeConfig", welcomeConfig)
