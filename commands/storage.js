module.exports.run = async (bot, message, args) => {
  
  // !restart
  await message.channel.send('There is currrently **49/512MB** space on this server')
  process.exit(1)
  
}

module.exports.help = {
  name: "storage"
}