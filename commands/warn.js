module.exports.run = async (bot, message, args) => {
   
var member= message.mentions.members.first();
   message.channel.send({embed: {
  color: 3447003,
  description: "Bad " + member.displayName + ", you got warned for whatever you just did wrong!"
}});
}

module.exports.help = {
  name: "warn"
}