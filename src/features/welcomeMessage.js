const { MessageEmbed } = require("discord.js")
const welcomeSchema = require("../database/welcome-config.js")

function returnEmbed(channel, member) {
  const welcomeEmbed = new MessageEmbed()
    .setDescription(
      `**--------------------**\nWelcome to the **${member.guild.name}** community ${member.user.tag}! There are now *${member.guild.memberCount} members* in this server! Enjoy your stay here!\n**--------------------**\nCheck the <#973963670176563290> channel to gain full access to the server! 😁
        `
    )
    .setAuthor(
      `Welcome, ${member.user.username}!`,
      "https://cdn.discordapp.com/attachments/972777349105991704/975278772221775932/809385119236096020.gif"
    )
    .setThumbnail(member.displayAvatarURL())
    .setColor("#FFFF00")
  return channel.send({ embeds: [welcomeEmbed] })
}

module.exports = async (member) => {
  const welcomeData = {}
  const { guild, id } = member

  let data = welcomeData[guild.id]

  if (!data) {
    const results = await welcomeSchema.findOne({ GuildID: guild.id })
    if (!results) {
      return console.log("No results found")
    }

    const channelId = results.ChannelID
    const enabled = results.Enabled

    // const { channelId, enabled } = results
    const channel = guild.channels.cache.get(channelId)
    data = welcomeData[guild.id] = [channel, enabled]

    if (!data[1] || data[1] === false) {
      return console.log("welcome msg disabled")
    }
  }

  returnEmbed(data[0], member)
}
