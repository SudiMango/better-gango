// Imports
const currencySchema = require("../../database/currencySchema.js")
const dictionary = require("../../features/dictionary.js")
const inventory = require("../../database/inventory.js")
const usersMap = new Map()
const otherMap = new Map()

// Module
module.exports = {
  name: "steal",
  description: "Steal mangoes from people 👀",
  type: "Game",
  async execute(msg, args, client, prefix, bannedWords, muteRole) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    if (args.length > 2 || args.length < 2)
      return msg.reply("that aint a command bruh 💀")

    // Make sure person can't spam this command
    if (usersMap.has(msg.author.id)) {
      const userData = usersMap.get(msg.author.id)
      let msgCount = userData.msgCount
      let caught = userData.caught
      if (parseInt(msgCount) === 1) {
        if (caught) {
          return msg.reply(
            "Hold your horses! You got caught stealing! You have to wait 6 minutes before you can steal again!"
          )
        } else {
          return msg.reply(
            "Hold your horses! You can only steal every 3 minutes!"
          )
        }
      } else {
        msgCount++
        userData.msgCount = msgCount
        usersMap.set(msg.author.id, userData)
      }
    }

    if (args.length === 2) {
      let target = args[1]
      if (target.startsWith("<@") && target.endsWith(">")) {
        try {
          let new1 = target.replace("<@", "")
          let new2 = new1.replace(">", "")
          let targetMember = await msg.guild.members.fetch(new2)

          if (new2 === msg.author.id) {
            usersMap.delete(msg.author.id)
            return msg.reply("U tryna steal from urself? How broke are u 🤨")
          }

          if (otherMap.has(new2)) {
            const userData = otherMap.get(new2)
            let stolen = userData.Stolen
            if (parseInt(stolen) === 1) {
              return msg.reply(
                "Cmon man, someone just stole from them not too long ago so he has a 3 minute shield, go steal from someone else"
              )
            } else {
              stolen++
              userData.Stolen = stolen
              otherMap.set(new2, userData)
            }
          } else {
            otherMap.set(new2, {
              Stolen: 1,
            })
            console.log("set new2")

            setTimeout(() => {
              otherMap.delete(new2)
              console.log("removed from map")
            }, 180000)
          }

          const stolenConfigFile = await currencySchema.findOne({
            UserID: new2,
          })

          const robberConfigFile = await currencySchema.findOne({
            UserID: msg.author.id,
          })

          if (!stolenConfigFile) {
            let profile = await currencySchema.create({
              UserID: new2,
              ServerID: msg.guild.id,
              Mangoes: 20,
              Bank: 0,
              BankLimit: 500,
            })
            profile.save()
            usersMap.delete(msg.author.id)
            return msg.reply(
              "Cmon that person barely has anything, it's not worth it."
            )
          }

          if (stolenConfigFile.Mangoes <= 50) {
            usersMap.delete(msg.author.id)
            return msg.reply(
              "Cmon that person barely has anything, it's not worth it."
            )
          }

          let total1 = stolenConfigFile.Mangoes
          let total2 = robberConfigFile.Mangoes

          inventory.findOne({ UserID: new2 }, async (err, data) => {
            if (!data) {
              console.log("doesnt have data")
              let randomNum = Math.floor(Math.random() * 10) + 1
              console.log(randomNum)
              if (randomNum === 1) {
                let max = (total2 / 100) * 15
                let min = (total2 / 100) * 0
                let taken = Math.floor(Math.random() * (max - min + 1)) + min
                await currencySchema
                  .findOneAndUpdate(
                    {
                      UserID: msg.author.id,
                    },
                    {
                      $inc: {
                        Mangoes: -taken,
                      },
                    }
                  )
                  .catch((err) => {
                    console.log(err)
                  })

                await currencySchema
                  .findOneAndUpdate(
                    {
                      UserID: new2,
                    },
                    {
                      $inc: {
                        Mangoes: taken,
                      },
                    }
                  )
                  .catch((err) => {
                    console.log(err)
                  })

                usersMap.set(msg.author.id, {
                  msgCount: 1,
                  caught: true,
                })

                setTimeout(() => {
                  usersMap.delete(msg.author.id)
                  console.log("removed from map")
                }, 300000)
                return msg.reply(
                  `Oh no! You got caught tryna steal from people! You were fined ${taken} mangoes!`
                )
              } else {
                let max = (total1 / 100) * 15
                let min = (total1 / 100) * 0
                let given = Math.floor(Math.random() * (max - min + 1)) + min
                try {
                  await currencySchema
                    .findOneAndUpdate(
                      {
                        UserID: msg.author.id,
                      },
                      {
                        $inc: {
                          Mangoes: given,
                        },
                      }
                    )
                    .catch((err) => {
                      console.log(err)
                    })

                  await currencySchema
                    .findOneAndUpdate(
                      {
                        UserID: new2,
                      },
                      {
                        $inc: {
                          Mangoes: -given,
                        },
                      }
                    )
                    .catch((err) => {
                      console.log(err)
                    })

                  usersMap.set(msg.author.id, {
                    msgCount: 1,
                    caught: false,
                  })
                  setTimeout(() => {
                    usersMap.delete(msg.author.id)
                    console.log("removed from map")
                  }, 180000)

                  return msg.reply(
                    `Wow! You managed to steal **${given} mangoes** from ${target}`
                  )
                } catch (err) {
                  console.log(err)
                }
              }
            }
            if (data) {
              const hasItem = Object.keys(data.Inventory).includes("walletlock")
              if (hasItem) {
                console.log("person has wallet lock")
                if (data.Inventory["walletlock"] > 1) {
                  data.Inventory["walletlock"]--
                  await inventory
                    .findOneAndUpdate({ UserID: new2 }, data)
                    .catch((err) => {
                      console.log(err)
                    })
                } else {
                  await inventory
                    .findOneAndUpdate(
                      { UserID: new2 },
                      {
                        $unset: {
                          "Inventory.walletlock": data.Inventory["walletlock"],
                        },
                      },
                      { multi: true }
                    )
                    .catch((err) => {
                      console.log(err)
                    })
                }
                let randomNum = Math.floor(Math.random() * 10) + 1
                console.log(randomNum)
                if (randomNum === 1) {
                  let max = (total1 / 100) * 15
                  let min = (total1 / 100) * 0
                  let given = Math.floor(Math.random() * (max - min + 1)) + min
                  try {
                    await currencySchema
                      .findOneAndUpdate(
                        {
                          UserID: msg.author.id,
                        },
                        {
                          $inc: {
                            Mangoes: given,
                          },
                        }
                      )
                      .catch((err) => {
                        console.log(err)
                      })

                    await currencySchema
                      .findOneAndUpdate(
                        {
                          UserID: new2,
                        },
                        {
                          $inc: {
                            Mangoes: -given,
                          },
                        }
                      )
                      .catch((err) => {
                        console.log(err)
                      })

                    usersMap.set(msg.author.id, {
                      msgCount: 1,
                      caught: false,
                    })
                    setTimeout(() => {
                      usersMap.delete(msg.author.id)
                      console.log("removed from map")
                    }, 180000)

                    return msg.reply(
                      `Wow! You managed to break past the Wallet Lock and steal **${given} mangoes** from ${target}`
                    )
                  } catch (err) {
                    console.log(err)
                  }
                } else {
                  let max = (total2 / 100) * 15
                  let min = (total2 / 100) * 0
                  let taken = Math.floor(Math.random() * (max - min + 1)) + min
                  await currencySchema
                    .findOneAndUpdate(
                      {
                        UserID: msg.author.id,
                      },
                      {
                        $inc: {
                          Mangoes: -taken,
                        },
                      }
                    )
                    .catch((err) => {
                      console.log(err)
                    })

                  await currencySchema
                    .findOneAndUpdate(
                      {
                        UserID: new2,
                      },
                      {
                        $inc: {
                          Mangoes: taken,
                        },
                      }
                    )
                    .catch((err) => {
                      console.log(err)
                    })

                  usersMap.set(msg.author.id, {
                    msgCount: 1,
                    caught: true,
                  })
                  setTimeout(() => {
                    usersMap.delete(msg.author.id)
                    console.log("removed from map")
                  }, 300000)
                  return msg.reply(
                    `Oh no! You got caught tryna steal from people! You were fined ${taken} mangoes!`
                  )
                }
              } else {
                console.log("doesnt have walletlock")
                let randomNum = Math.floor(Math.random() * 10) + 1
                console.log(randomNum)
                if (randomNum === 1) {
                  let max = (total2 / 100) * 15
                  let min = (total2 / 100) * 0
                  let taken = Math.floor(Math.random() * (max - min + 1)) + min
                  await currencySchema
                    .findOneAndUpdate(
                      {
                        UserID: msg.author.id,
                      },
                      {
                        $inc: {
                          Mangoes: -taken,
                        },
                      }
                    )
                    .catch((err) => {
                      console.log(err)
                    })

                  await currencySchema
                    .findOneAndUpdate(
                      {
                        UserID: new2,
                      },
                      {
                        $inc: {
                          Mangoes: taken,
                        },
                      }
                    )
                    .catch((err) => {
                      console.log(err)
                    })

                  usersMap.set(msg.author.id, {
                    msgCount: 1,
                    caught: true,
                  })

                  setTimeout(() => {
                    usersMap.delete(msg.author.id)
                    console.log("removed from map")
                  }, 300000)
                  return msg.reply(
                    `Oh no! You got caught tryna steal from people! You were fined ${taken} mangoes!`
                  )
                } else {
                  let max = (total1 / 100) * 15
                  let min = (total1 / 100) * 0
                  let given = Math.floor(Math.random() * (max - min + 1)) + min
                  try {
                    await currencySchema
                      .findOneAndUpdate(
                        {
                          UserID: msg.author.id,
                        },
                        {
                          $inc: {
                            Mangoes: given,
                          },
                        }
                      )
                      .catch((err) => {
                        console.log(err)
                      })

                    await currencySchema
                      .findOneAndUpdate(
                        {
                          UserID: new2,
                        },
                        {
                          $inc: {
                            Mangoes: -given,
                          },
                        }
                      )
                      .catch((err) => {
                        console.log(err)
                      })

                    usersMap.set(msg.author.id, {
                      msgCount: 1,
                      caught: false,
                    })
                    setTimeout(() => {
                      usersMap.delete(msg.author.id)
                      console.log("removed from map")
                    }, 180000)

                    return msg.reply(
                      `Wow! You managed to steal **${given} mangoes** from ${target}`
                    )
                  } catch (err) {
                    console.log(err)
                  }
                }
              }
            }
          })
        } catch (err) {
          usersMap.delete(msg.author.id)
          otherMap.delete(new2)
          console.log(err)
          msg.reply("Please tag a member in this server")
        }
      } else {
        usersMap.delete(msg.author.id)
        otherMap.delete(new2)
        msg.reply("Please tag a member in this server")
      }
    }
  },
}
