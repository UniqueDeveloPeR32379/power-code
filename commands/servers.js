const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {   
  let embed = new Discord.RichEmbed()
    .setTitle("servers")
    .setColor(0xFF4500);
    
  
  let owners = process.env.OWNER.split(',');
  
  if (!owners.includes(message.author.id))  {
    embed
      .setTitle("Permission Denied")
      .setDescription("You do not have permission to use this command. ONLY OWNER CAN USE");
    
    return message.channel.send(embed);
  }
  
  message.channel.send(embed).then(m => {
  	embed
     	.setTitle("Servers List !")
  		.addField('Name', client.guilds.map(g => `${g.name} ID =${g.id} Mcount = ${g.members.size}` ))
      
      
      m.edit(embed);
  });
};

//exports.help = {
  //name: "servers",
  //category: "General",
