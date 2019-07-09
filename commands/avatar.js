module.exports.run = async(bot, message, args) => {
    let msg = await message.channel.send("doing some magic ...");
    let target = message.mentions.users.first() || message.author;

    await message.channel.send({files: [
        {
            attachment: target.displayAvatarURL,
            name: "avatar${message.author}.gif"
        }
    ]});

    msg.delete();
}

//module.exports.help = {
   // name: "avatar",
  //  category: "Moderation",
   // description: "show the avatar of a user",
  //  usage: "[@user]"
//}