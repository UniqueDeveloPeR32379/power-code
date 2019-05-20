module.exports.run = async (bot, message, args) => {
  
  // !restart
  await message.channel.send('Dont ask me, idk either')
  process.exit(1)
  
}

module.exports.help = {
  name: "idk"
}