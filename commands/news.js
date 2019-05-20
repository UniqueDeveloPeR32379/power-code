module.exports.run = async (bot, message, args) => {
  
  // !ping
  
  message.delete().catch(O_o => {});
  message.channel.send("Checking for updates...").then(msg => {
    msg.edit(`Found new commands on the server!: **B.mute, B.kick, B.unmute, B.ban, B.unban**`)
  });
  console.log(args)
}

module.exports.help = {
  name: "news"
}