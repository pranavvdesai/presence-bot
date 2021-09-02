const Discord = require('discord.js');
const { Client } = require('discord.js');
const client = new Client({ partials: ['MESSAGE', 'REACTION'] });
const mysql = require("mysql2");
const chalk = require("chalk");
const figlet = require("figlet");
require('dotenv').config();

// Login
const PREFIX = '!';
client.login(process.env.BOT_TOKEN);

// Database
var conn = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE
});

function Time() {
	// Get unix time
	return Math.floor(new Date().getTime() / 1000);
}

client.on('ready', () =>
{
	// Start
	console.log('─────────────────────────────────────────────');
	console.log(chalk.green(figlet.textSync('ADG', { horizontalLayout: 'full' })+'presence-bot'));
	console.log('─────────────────────────────────────────────');
	console.log(chalk.red(`Bot started!\n---\n`
	+ `> Users: ${client.users.cache.size}\n`
	+ `> Channels: ${client.channels.cache.size}\n`
	+ `> Servers: ${client.guilds.cache.size}`));
	console.log('─────────────────────────────────────────────');
	client.user.setActivity(`${PREFIX}shop`, {type: 'WATCHING'});
});
