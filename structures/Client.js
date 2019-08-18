  const Discord = require('discord.js');
const Hook = require('quick.hook');
const db = require('quick.db');
const Enmap = require('enmap')

class Base extends Discord.Client {
    constructor(...args) {
        super(...args);
        this.commands = new Discord.Collection();
        this.aliases = new Discord.Collection();
        this.CommandHandler = new (require('./CommandHandler'))(this);
        this.EventHandler = new (require('./EventHandler'))(this);
        this.Website = new (require('./Website'))(this);
        this.hook = Hook;
        this.db = db;
        this.enmap = Enmap;
        this.queue = new Enmap({
          name: 'queue',
          autoFetch: true,
          fetchAll: false,
          cloneLevel: 'deep',
          ensureProps: true,
        });
        this.signature = new Enmap({
          name: 'signature',
          autoFetch: true,
          fetchAll: false,
          cloneLevel: 'deep',
          ensureProps: true,
        });
        this.botData = new Enmap({
          name: 'bot',
          autoFetch: true,
          fetchAll: false,
          cloneLevel: 'deep',
          ensureProps: true,
        });
        this.leaderboard = new Enmap({
          name: 'leaderboard',
          autoFetch: true,
          fetchAll: false,
          cloneLevel: 'deep',
          ensureProps: true,
        });
        this.prefix = '++';
    }
    
    run(options) {
        this.managerOptions = options;
        this.CommandHandler.load();
        this.EventHandler.load();
        this.Website.load();
    }
    
}

module.exports = Base;