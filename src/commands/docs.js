// const Commando = require("discord.js-commando")
// const axios = require("axios")

// module.exports = class DocsCommand extends Commando.Command {
//   constructor(client) {
//     super(client, {
//       name: "docs",
//       //   group: "misc",
//       //   memberName: "docs",
//       description: "displays discord.js docs",
//     })
//   }

//   run = async (msg, args) => {
//     const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
//       args.shift()
//     )}`

//     axios
//       .get(uri)
//       .then((embed) => {
//         console.log(embed)
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   }
// }
