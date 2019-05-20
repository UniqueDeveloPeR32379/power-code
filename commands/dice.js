const Discord = module.require('discord.js');

var hd = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
];

module.exports.run = async (bot, message, args) => {

  message.channel.send(message.author.toString() + " You Rolled: " + (hd[Math.floor(Math.random() * hd.length)]));
}

module.exports.help = {
    name: "dice"
}