const Discord = module.require('discord.js');

var hd = [
    "is 4 inches long 8====>",
    "is 6 inches long 8======>",
    "is 11 inches long 8===========>",
    "is 1 inch long 8=>",
    "is 9 inches long 8=========>",
];

module.exports.run = async (bot, message, args) => {

  message.channel.send(message.author.toString() + " Your penis " + (hd[Math.floor(Math.random() * hd.length)]));
}

module.exports.help = {
    name: "penis"
} 