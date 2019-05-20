module.exports.run = async (bot, message, args) => {
  
  // !restart
  await message.channel.send('**Restarting...**')
  process.exit(1)
  
}

module.exports.help = {
  name: "restart"
}