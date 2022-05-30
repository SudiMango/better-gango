const mongoose = require("mongoose")

const currencySchema = new mongoose.Schema({
  UserID: {
    type: String,
    required: true,
    unique: true,
  },
  ServerID: {
    type: String,
    required: true,
  },
  Mangoes: {
    type: Number,
    default: 20,
  },
  Bank: {
    type: Number,
  },
  BankLimit: {
    type: Number,
    default: 500,
  },
})

module.exports = mongoose.model("currencySchema", currencySchema)
