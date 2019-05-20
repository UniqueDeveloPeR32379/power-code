const Discord = module.require('discord.js');

var hd = [
    "are **23%** gay",
    "are **49%%** gay",
    "are **13%** gay",
    "are **83%** gay",
    "are **100%** gay",
    "are **38%** gay",
];

module.exports.run = async (bot, message, args) => {

  message.channel.send(message.author.toString() + " You " + (hd[Math.floor(Math.random() * hd.length)]));
}

module.exports.help = {
    name: "amigay"
}