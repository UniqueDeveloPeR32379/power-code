module.exports.run = async(client, message, args) => {

const Discord = require('discord.js');
let member = message.mentions.users.first() || message.author;

//exports.run = (client, message, args) => {

  
  
member.generateInvite(['ADMINSTRATOR'])
  .then(link => message.channel.send(`Generated bot invite link: ${link}`))
  .catch(console.error)
  
}
