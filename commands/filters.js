module.exports.run = async (bot, message, args) => {
   
var member= message.mentions.members.first();
   message.channel.send("**Filters** \n \n__Links:__\nThis feature is currently disabled.")
  
}

module.exports.help = {
  name: "filters"
}