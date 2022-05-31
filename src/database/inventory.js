const mongoose = require("mongoose")

let inventoryConfig = new mongoose.Schema({
  UserID: {
    type: String,
    required: true,
    unique: true,
  },
  ServerID: {
    type: String,
    required: true,
  },
  Inventory: {
    type: Object,
  },
})

module.exports = mongoose.model("inventoryConfig", inventoryConfig)
