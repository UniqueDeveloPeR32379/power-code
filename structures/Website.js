'use strict';



class Website {
  constructor(client) {
    this.client = client;
  }

  async load() {
    console.log('[Website] Launching...');

    let client = this.client;
    let express = require('express');
    let app = express();
    let http = require('http').createServer(app);
    let url = require('url');
    let nodefetch = require('node-fetch');
    let passport = require('passport')
    let Strategy = require("passport-discord").Strategy;
    let session = require('express-session')
    client.io = require('socket.io')(http);
    
    app.use(express.static('public'))

    app.get('/', function(req, res) {
      res.sendFile(__dirname + '/index.html');
    });
    const DStrategy = new Strategy({
        clientID: '583910433300152331',
        clientSecret: 'MMeSUwv1JYCy1Jk0zGETdZbjvWRPm57r',
        callbackURL: 'http://www.queue-xenox.cf/callback',
        scope: ["identify"]
      },
      (accessToken, refreshToken, profile, done) => {
        profile.refreshToken = refreshToken
        return process.nextTick(() => done(null, profile));
      }
    )
    passport.use(DStrategy);
    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((obj, done) => {
      done(null, obj);
    });
    app.use(session({
      secret: "BCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.",
      resave: false,
      saveUninitialized: false,
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    let bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    let baseApiUrl = 'https://discordapp.com/api/';
    app.get('/', (req, res, next) => {
        if (req.session.backURL) {
            req.session.backURL = req.session.backURL;
        } else if (req.headers.referer) {
            const parsed = url.parse(req.headers.referer);
            if (parsed.hostname === app.locals.domain) {
                req.session.backURL = parsed.path;
            }
        } else {
            req.session.backURL = "/";
        }
        next();
    },
        passport.authenticate("discord"))
    app.get('/callback', passport.authenticate('discord', {
      failureRedirect: "/"
    }),
    function(request, response) {
      console.log("callback")
      if (request.originalUrl.includes('error=access_denied')) return response.redirect('/');
      let bearer = request.user.accessToken;
      let signature = "pid_";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.";
      for (var i = 0; i < 25; i++) signature += possible.charAt(Math.floor(Math.random() * possible.length));
      client.signature.set(`${signature}`, bearer)
      response.cookie("bearer", signature);
      response.redirect('/');
    });

    client.io.on('connection', function(socket) {
      console.log('[Website] Unknown User Connected');

     socket.on('getInfo', async function(bearer) {
        let tok = await client.signature.fetch(bearer)
        await nodefetch(`${baseApiUrl}users/@me`, {
          method: "GET",
          headers: {
            'Authorization' : `Bearer ${tok}`
          }
        }).then(res => res.json()).then(async user => {
          console.log(`[Fetching Data] ${user.username}#${user.discriminator}`);
           
            let isuser = await client.guilds.get(client.managerOptions.mainGuildID).members.get(user.id) ? true : false
            let hasPermission = isuser ? client.guilds.get(client.managerOptions.mainGuildID).members.get(user.id).hasPermission('MANAGE_NICKNAMES') : false
            
             //Fetch Queue
            let queue = [];
            let data = await client.queue.fetch("queue") || [];
            for (let i in data) { // Update Queue
              
             let bot = await client.botData.fetch(`${data[i]}`)
             let apiInfo = await client.users.fetch(data[i]);
             queue.push(Object.assign({ bot: { id: data[i], name: apiInfo.username, avatar: apiInfo.displayAvatarURL() } }, bot, client.managerOptions));
             
            }
          
            // Fetch Leaderboard
            let lb = [];
            let leaderboard = await client.leaderboard.fetch('leaderboard') || {};
        
            for (let i in leaderboard) {
              
              let lbUser = await client.users.fetch(i);
              
              lb.push({ avatar: lbUser.displayAvatarURL(), username: lbUser.username, tested: leaderboard[i] });
            }
            lb = Object.values(lb).sort((a, b) => b.tested - a.tested);
            socket.emit('getInfoWeb', {
              id: user.id,
              username: user.username,
              guildName: client.managerOptions.mainGuildName,
              queue: queue,
              leaderboard: lb,
              hasPermission: hasPermission
            });
              
          }).catch(err => {
            console.log(err);
            socket.emit('getInfo', false);
          });
      });

      socket.on('test', async function(data) {
        let tok = await client.signature.fetch(data.bearer)
        await nodefetch(`${baseApiUrl}users/@me`, {
          method: "GET",
          headers: {
            'Authorization' : `Bearer ${tok}`
          }
        }).then(res => res.json()).then(async user => {
          console.log(`[Fetching Data] ${user.username}#${user.discriminator} test`);
          if (!client.guilds.get(client.managerOptions.mainGuildID).members.get(user.id).hasPermission('MANAGE_NICKNAMES')) return socket.emit('getInfo', 403);
          
          // Variables
          let author = user;
          let botID = data.botID;
          let bot = await client.botData.fetch(`${botID}`);
          
          // Already Testing?
          if (bot.code >= 2) return;
          
          // Update Database
          await client.botData.set(`${botID}`, 2, "code");
          await client.botData.set(`${botID}`, { id: author.id, name: author.username }, "tester");
          
          // Send Notification
          client.channels.get(client.managerOptions.logsChannelID).send(`(Owner: ${client.users.get(bot.authorID).tag}) **${client.users.get(botID).tag}** is now being tested by **${author.username}#${author.discriminator}**.`);
    
          // Emit getNewInfo
          client.io.emit('getNewInfo', true);
          
        }).catch(err => {
            console.log(err);
            socket.emit('getInfo', false);
          });
      });
    
    socket.on('accept', async function(data) {
        let tok = await client.signature.fetch(data.bearer)
        await nodefetch(`${baseApiUrl}users/@me`, {
          method: "GET",
          headers: {
            'Authorization' : `Bearer ${tok}`
          }
        }).then(res => res.json()).then(async user => {
          console.log(`[Fetching Data] ${user.username}#${user.discriminator}`);
          if (!client.guilds.get(client.managerOptions.mainGuildID).members.get(user.id).hasPermission('MANAGE_NICKNAMES')) return socket.emit('getInfo', 403);
          
          // Variables
          let author = user;
          let botID = data.botID;
          let bot = await client.botData.fetch(`${botID}`);
          let uBot = await client.users.fetch(botID)
          
          // Already Approved?
          if (bot.code >= 4) return;
          
          // Update Database
          client.botData.set(`${botID}`, 3, "code");
          
          // Update Leaderboard
          client.leaderboard.get('leaderboard', `${author.id}`) ? client.leaderboard.inc('leaderboard', `${author.id}`) : client.leaderboard.set("leaderboard", 1, `${author.id}`);
          
          // Emit getNewInfo
          client.io.emit('getNewInfo', true);
          
          // Send Notification
          client.channels.get(client.managerOptions.logsChannelID).send(`(Owner: ${client.users.get(bot.authorID).tag}) **${uBot.username}#${uBot.discriminator}**` + ` has been approved by **${author.username}#${author.discriminator}**.`);
          
          // Kick From Testing Guild
          client.guilds.get(client.managerOptions.testingGuildID).members.get(botID).kick();
    
        }).catch(err => {
            console.log(err);
            socket.emit('getInfo', false);
          });
      });
      
      socket.on('deny', async function(data) {
        let tok = await client.signature.fetch(`${data.bearer}`)
        await nodefetch(`${baseApiUrl}users/@me`, {
          method: "GET",
          headers: {
            'Authorization' : `Bearer ${tok}`
          }
        }).then(res => res.json()).then(async user => {
          console.log(`[Fetching Data] ${user.username}#${user.discriminator}`);
          if (!client.guilds.get(client.managerOptions.mainGuildID).members.get(user.id).hasPermission('MANAGE_NICKNAMES')) return socket.emit('getInfo', 403);
          
          // Variables
          let author = user;
          let botID = data.botID;
          let bot = await client.botData.fetch(`${botID}`);
          let uBot = await client.users.fetch(botID)
          
          console.log(author, botID, bot, data);
          
          // Remove From Queue
          let queue = await client.queue.fetch("queue");
          if (typeof queue !== 'object') queue = [];
          let index = queue.indexOf(botID);
          if (index != -1) {
            queue.splice(index, 1);
            await client.queue.set('queue', queue);
          }
          
          // Update Database
          client.botData.delete(`${botID}`);
          
          // Update Leaderboard
          client.leaderboard.get('leaderboard', author.id) ? client.leaderboard.inc('leaderboard', `${author.id}`) : client.leaderboard.set("leaderboard", 1, `${author.id}`);
          
          // Emit getNewInfo
          client.io.emit('getNewInfo', true);  
          
          // Send Notification
          client.channels.get(client.managerOptions.logsChannelID).send(`(Owner: ${await client.users.fetch(bot.authorID)}) **${uBot.username}#${uBot.discriminator}** has been denied for **"${data.reason || 'No reason provided'}"**.`)
          //message.channel.send('hello world')
        .then(sentMessage => sentMessage.react('a:emoji_32:610366304385237002'))
       .catch(console.error) 
            
          // Kick From Testing Guild
          try {
            client.guilds.get(client.managerOptions.testingGuildID).members.get(botID).kick();
            client.channels.get(client.managerOptions.reqID).send(`${uBot.username} KICKED ${bot.id} Because ${data.reason}`);
          } catch(e) {
            
          }
          
        }).catch(err => {
            console.log(err);
            socket.emit('getInfo', false);
        });
      });
      
    });

    http.listen(process.env.PORT, function() {
      console.log(`[Website] Listening on *:${process.env.PORT}`);
    });

  }

}

module.exports = Website;
 

