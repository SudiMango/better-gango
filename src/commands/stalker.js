module.exports = {
  name: "stalker",
  description: "stalker cmd",
  execute(msg, args) {
    switch (args.length) {
      case 1:
        msg.reply(
          "You need to provide the 3 arguments *(eg. ;stalker 16 male Ethiopia @user)*"
        )
        break
      case 2:
        msg.reply(
          "You need to provide the 2 more arguments *(eg. ;stalker 16 male Ethiopia @user)*"
        )
        break
      case 3:
        msg.reply(
          "You need to provide the 1 more arguments *(eg. ;stalker 16 male Ethiopia @user)*"
        )
        break
      case 4:
        msg.reply(
          "You need to provide the 1 more arguments *(eg. ;stalker 16 male Ethiopia @user)*"
        )
        break
      case 5:
        let target = msg.mentions.users.first()

        if (!target) return msg.reply("Can't find that member.")

        let targetMember = msg.guild.members.cache.get(target.id)

        msg.channel.send(
          ` ${targetMember} So you are a ${args[1]} year old ${args[2]} living in ${args[3]} 😈`
        )
        break
      default:
        msg.reply(
          "You need to provide the 3 proper arguments *(eg. ;stalker 16 male Ethiopia @user)*"
        )
        break
    }
  },
}
