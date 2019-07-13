module.exports.run = async(client, message, args) => {

const Discord = require('discord.js');
//let member = message.mentions.users.first()|| message.author.id;
let member = message.mentions.users.first() 
console.log(member.id)
  
//exports.run = (client, message, args) => {
 message.channel.send("https://discordapp.com/oauth2/authorize?&client_id=" + member.id + "&scope=bot&permissions=8/");
  
  
//member.generateInvite(['ADMINSTRATOR'])
  //.then(link => message.channel.send(`Generated bot invite link: ${link}`))
  //.catch(console.error)
  
}
