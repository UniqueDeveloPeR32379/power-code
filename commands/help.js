module.exports.run = async (bot, message, args) => {
  
  // !restart
  await message.member.send('**General Commands** ```B.support, B.invite, B.say, B.ping, B.restart``` \n **Info Commands** ```B.avatar, B.uptime, B.serverinfo, B.userinfo, B.creator -, B.storage, B.help``` \n **Fun Commands** ```B.love, B.dadjoke, B.coin, B.8ball, B.dice, B.idk, B.amigay, B.clyde - could not be delivered``` \n **Moderation Commands** ```B.kick, B.ban, B.warn``` \n **Music Commands**   ```B.join``` \n **Beta Commands** ```B.filteron, B.filteroff, B.level```')
  
  message.channel.send({embed: {
  color: 3447003,
  description: "Success, I have sent my list of commands to your **direct messages**!"
}});
    
}

module.exports.help = {
  name: "help"
}