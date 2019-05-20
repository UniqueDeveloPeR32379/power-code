module.exports.run = async (bot, message, args) => {
  
  // !restart
  await message.channel.send('https://discordapp.com/api/oauth2/authorize?client_id=578920006310559754&permissions=8&scope=bot')
  process.exit(1)
  
}

module.exports.help = {
  name: "invite"
}