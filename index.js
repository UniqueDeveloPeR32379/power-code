const Client = require('./structures/Client');
const client = new Client();

const options = {
  reqID: (process.env.C),
  mainGuildID: (process.env.MG),
  inviteChannelID: (process.env.I),
  logsChannelID: (process.env.L),
  mainGuildName: 'Xenox Development', // Name Cannot Be In .env , It will throw erorr or Give msg Undefined
  testingGuildID: (process.env.TG),
}

client.run(options);
client.login(process.env.TOKEN);
//client.user.setActivity(` Bots in Queue - ${client.queue.get('queue').length}`);

client.on('ready', () => {
  console.log('[Discord Bot] Ready!')
})