require('dotenv').config();
const database = {
	default: process.env.DATABASETYPE || 'mysql',
	mysql: {
		connectionLimit: 100,
		host: process.env.HOST || '127.0.0.1',
		user: process.env.USERNAME || 'root',
		password: process.env.PASSWORD || '',
		database: process.env.DATABASE || 'serviceWeb',
		charset: 'utf8mb4',
	},
	url: '',
};

module.exports = database;
