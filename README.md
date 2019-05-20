Discord.js Template
===================

Came here for a discord bot template? Perfect, this is just for you! The discord bot is coded in javascript and:

- Has a fully functional command handler

- Status such as `Playing With Friends`

- A ping command to get you started!

botconfig.json
--------------

Over here, this is where we'll be storing all of our colors and our prefix. All of this is fully customizable, and you can change it however you want. 

server.js
---------

This is your main JavaScript file and where your main code will be. This is how your discord bot will come alive!

watch.json
----------

Do not touch this file. This is what's preventing your discord bot from refreshing every single time you type something. Mmk?

Commands Folder
---------------

This is where all your commands will be made and used. To make a new command, make a new file called `commands/Command-Name.js`. Then insert this into your file:

```
module.exports.run = async (bot, message, args) => {

}

module.exports.help = {
  name: "Command Name"
}
```

Special Note from Mintical
--------------------------

Do not show you Bot Token publicly in your `server.js`. Instead, go to your `.env` file and make a new variable called `TOKEN` and make it equal your token. Then, in your `server.js` file, you can access it using `process.env.TOKEN`.

Social Medias and Support
=========================

- Join my [Discord Server](https://discord.gg/aHcRGSW)!

- Follow me on [Twitter](https://twitter.com/MinticalGames)

- Subscribe to me on [YouTube](https://www.youtube.com/channel/UCxwURBC4iwn9QsnvhW-FUmA)