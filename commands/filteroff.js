module.exports.run = async (bot, message, args) => {
  
  // !restart
  await message.channel.send(':point_right: Spam filter is now **deactivated** on this server, no messages will be filtered which could lead to potential spammers. (beta, may not work as expected) :point_left:')
  process.exit(1)
  
}

module.exports.help = {
  name: "filteroff"
}