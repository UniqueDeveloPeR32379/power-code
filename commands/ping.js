module.exports.run = async (bot, message, args) => {
  
  // !ping
   message.channel.send("Pong...").then(msg => {
    msg.edit(`**Pong!** ${Date.now() - message.createdTimestamp} ms`)
  });
  console.log(args)
}

module.exports.help = {
  name: "ping"
}