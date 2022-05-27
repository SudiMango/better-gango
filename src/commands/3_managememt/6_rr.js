const dictionary = require("../../features/dictionary.js")
const rrConfig = require("../../database/rrConfig.js")

module.exports = {
  name: "rr",
  description: "manual reaction role cmd",
  type: "Management",
  async execute(msg, args, client) {
    let foundInText = await dictionary.FoundInText(msg)

    if (foundInText) return

    if (!msg.member.permissions.has("ADMINISTRATOR"))
      return msg.reply("U don't have admin perms bozo 😂")

    if (args.length === 1) {
      await dictionary.AdvHelp(client, msg.channel, args[0], msg)
    } else if (args.length !== 5) {
      return msg.reply(
        "You need to provide all the arguments *(#channel,messageID,emoji,@role)*"
      )
    }

    if (args[1] && args[2] && args[3] && args[4]) {
      let channel = args[1]
      let messageID = args[2]
      let emoji = args[3]
      let role = args[4]
      if (channel.startsWith("<#") && channel.endsWith(">")) {
        try {
          let new1 = channel.replace("<#", "")
          let new2 = new1.replace(">", "")
          let targetChannel = await msg.guild.channels.fetch(new2)

          if (targetChannel) {
            try {
              let newMsg = await targetChannel.messages.fetch(messageID)
              let newReaction = null
              let goAhead = true

              newMsg.reactions.cache.filter((reaction) => {
                newReaction = reaction.emoji.name
                console.log(newReaction)
                if (newReaction === emoji) {
                  msg.reply("reaction already there")
                  goAhead = false
                }
              })

              if (newMsg && goAhead === true) {
                if (role.startsWith("<@&") && role.endsWith(">")) {
                  try {
                    let role1 = role.replace("<@&", "")
                    let role2 = role1.replace(">", "")
                    let targetRole = await msg.guild.roles.fetch(role2)

                    if (targetRole) {
                      try {
                        let reacted = newMsg.react(emoji)
                        if (reacted) {
                          client.on(
                            "messageReactionAdd",
                            async (reaction, user) => {
                              if (reaction.message.partial)
                                await reaction.message.fetch()
                              if (reaction.partial) await reaction.fetch()
                              if (user.bot) return
                              if (!reaction.message.guild) return

                              if (reaction.message.id === messageID) {
                                let myMember =
                                  await reaction.message.guild.members.fetch(
                                    user.id
                                  )
                                switch (reaction.emoji.name) {
                                  case emoji:
                                    myMember.roles.add(targetRole)
                                    break
                                }
                              }
                            }
                          )

                          client.on(
                            "messageReactionRemove",
                            async (reaction, user) => {
                              if (reaction.message.partial)
                                await reaction.message.fetch()
                              if (reaction.partial) await reaction.fetch()
                              if (user.bot) return
                              if (!reaction.message.guild) return

                              if (reaction.message.id === messageID) {
                                let myMember =
                                  await reaction.message.guild.members.fetch(
                                    user.id
                                  )
                                switch (reaction.emoji.name) {
                                  case emoji:
                                    myMember.roles.remove(targetRole)
                                    break
                                }
                              }
                            }
                          )

                          msg.reply(
                            `**Reaction role set:**\n**Channel:** *${channel}*\n**MessageID:** *${messageID}*\n**Emoji:** *${emoji}* , **Role:** *${role}*`
                          )
                        }
                      } catch (err) {
                        msg.reply("emoji not found")
                        console.log(err)
                      }
                    }
                  } catch (err) {
                    msg.reply("role not found")
                    console.log(err)
                  }
                } else {
                  msg.reply("please enter role correctly")
                }
              }
            } catch (err) {
              msg.reply("message not found")
              console.log(err)
            }
          }
        } catch (err) {
          msg.reply("channel not found")
          console.log(err)
        }
      } else {
        return msg.reply("please input channel correctly")
      }
    }
  },
}
