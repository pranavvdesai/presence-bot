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

		// Check Databases
		conn.connect(err => {
			if(err) throw err;
			console.log("- Database Connected.");
			console.log("- Checking if Msgs Table exist...");
			conn.query(`SHOW TABLES LIKE 'Msgs'`, (err, rows) => {
				if(err) throw err;
				if(rows.length < 1) {
					conn.query(`CREATE TABLE Msgs (UserID varchar(30) NOT NULL,Msgs int(11) DEFAULT 1) ENGINE=InnoDB DEFAULT CHARSET=latin1;`);
					console.log("- Msgs Database Built.");
					console.log("- Msgs database will be where the user messages count will be stored.");
				} else {
					console.log("- Msgs Database Exists.");
				}
			});
			console.log('─────────────────────────────────────────────');
			conn.query(`SHOW TABLES LIKE 'Activity'`, (err, rows) => {
				if(err) throw err;
				if(rows.length < 1) {
					conn.query(`CREATE TABLE Activity (ID int(11) NOT NULL,UserID varchar(30) NOT NULL,ChannelID varchar(25) NOT NULL,JoinTime int(11) NOT NULL,LeftTime int(11) DEFAULT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
					conn.query(`ALTER TABLE Activity ADD PRIMARY KEY (ID);`);
					conn.query(`ALTER TABLE Activity MODIFY ID int(11) NOT NULL AUTO_INCREMENT;`);
					console.log("- Activity Database Built.");
					console.log("- Activity database will be where the voice chat time for each user will be stored.");
				} else {
					console.log("- Activity Database Exists.");
				}
			});
			console.log('─────────────────────────────────────────────');
		});
});
