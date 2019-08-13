exports.run = async (client, member) => {

  // Testing Guild?
  if (member.guild.id === client.managerOptions.testingGuildID) {
   
    // Invited Bot?
    let bot = await client.botData.fetch(`${member.id}`);
    let author = await client.users.fetch(bot.authorID)
    if (!bot) return;
    
    // Update Cod
    client.botData.set(`${member.id}`, 1, "code")
    // Send Notification
    client.channels.get(client.managerOptions.logsChannelID).send(`(Owner: ${author.username}#${author.discriminator}) **${member.user.tag}** has been added to the verification center.`)
    .then(sentMessage => sentMessage.react('a:emoji_30:610354850735194133'))
    .catch(console.error) 
    
    client.channels.get(client.managerOptions.reqID).send(`_NEW BOT JOINED_ ! \n\n **BOT** : ${member.user.tag} \n\n ID -${member.user.id} \n\n PREFIX - ${bot.prefix} \n\n BOT OWNER : **_${client.users.get(bot.authorID).tag}_** \n\n **_THE END_**`)
    
    await member.roles.add(member.guild.roles.find(r => r.name === 'Testing BOTS'))
    
    // Update Username
    await member.setNickname(`[ ${bot.prefix} ] ${member.user.username}`)
    
    // Emit getNewInfo
    client.io.emit('getNewInfo', true);
    
  }

  // Main Guild?
  if (member.guild.id === client.managerOptions.mainGuildID) {
   
    // Invited Bot?
    let bot = await client.botData.fetch(`${member.id}`);
    if (!bot) return;
    
    // Update Code
    client.botData.set(`${member.id}`, 4, "code"); 
    
    // Remove From Queue
    let queue = await client.queue.fetch('queue') || [];
    let index = queue.indexOf(member.id);
    if (index != -1) queue.splice(index, 1);
    client.queue.set('queue', queue);
    
    // Update Username
    member.setNickname(`[ ${bot.prefix} ] ${member.user.username}`);
    
    // Add Bot Role
    member.roles.add(member.guild.roles.find(r => r.name === 'Dev Bots'));
    
    // Add Developer Role
    let owner = member.guild.members.get(bot.authorID);
    owner.roles.add(member.guild.roles.find(r => r.name === 'Developer'));
    
    // Send Notification
    client.channels.get(client.managerOptions.logsChannelID).send(`(Owner: ${owner}) **${member.user.tag}** has been added to **${client.managerOptions.mainGuildName}**. Congrats ! 🎉`);
    
    // Emit getNewInfo
    client.io.emit('getNewInfo', true);
    
  }
    
}