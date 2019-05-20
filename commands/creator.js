module.exports.run = async (bot, message, args) => {
  
  // !restart
  await message.channel.send('I was made and coded by **VeganSloth**!')
  process.exit(1)
  
}

module.exports.help = {
  name: "creator"
}