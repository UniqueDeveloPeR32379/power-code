module.exports.run = async (bot, message, args) => {
  
  // !restart
  function playAudio(voiceChannel, file) {
    
    voiceChannel.join().then(connection => {

        connection.playFile(file).on("end", () => {
                connection.disconnect();
                voiceChannel.leave();
        });

    });
}
  
}

module.exports.help = {
  name: "leave"
}