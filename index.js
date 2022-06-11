const Discord = require('discord.js');
const fs = require('fs');
const yaml = require("js-yaml")
const config = yaml.load(fs.readFileSync('settings/config.yml', 'utf8', 2))
require('colors')
const client = new Discord.Client({
    intents: 32767,
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

process.on('unhandledRejection', error => {
    console.error(error);
});

client.on('shardError', error => {
    console.error(error);
});

require("./handler")(client);

client.login(config.BotToken)