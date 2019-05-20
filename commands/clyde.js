module.exports.run = async (bot, message, args) => {
  
  // !restart
  await message.channel.send('Your message could not be delivered because you dont share a server with the recipient or you disabled direct messages on your shared server, recipient is only accepting direct messages from friends, or you were blocked by the recipient.')
  process.exit(1)
  
}

module.exports.help = {
  name: "clyde"
}