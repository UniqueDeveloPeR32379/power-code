const Discord = module.require('discord.js');

var hd = [
    "1.1K xp in this guild! **(this feature is in beta)**",
    "1.2K xp in this guild! **(this feature is in beta)**",
    "1.3K xp in this guild! **(this feature is in beta)**",
    "1.4K xp in this guild! **(this feature is in beta)**",
    "1.5K xp in this guild! **(this feature is in beta**)",
    "1.6K xp in this guild! **(this feature is in beta)**",
    "1.7K xp in this guild! **(this feature is in beta)**",
    "1.8K xp in this guild! **(this feature is in beta)**",
    "1.9K xp in this guild! **(this feature is in beta)**",
    "You just leveled up! **(this feature is in beta)**",
  
];

module.exports.run = async (bot, message, args) => {

  message.channel.send(message.author.toString() + " You have " + (hd[Math.floor(Math.random() * hd.length)]));
}

module.exports.help = {
    name: "level"
}