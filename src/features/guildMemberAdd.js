const currencySchema = require("../database/currencySchema.js")

module.exports = async (client, member) => {
  let profile = await currencySchema.create({
    UserID: member.id,
    ServerID: member.guild.id,
    Mangoes: 20,
    Bank: 0,
  })
  profile.save()
}
