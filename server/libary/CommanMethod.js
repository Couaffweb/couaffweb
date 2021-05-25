/*
 * v1
 * auth pankaj vashisht @sharmapankaj688@gmail.com
 * helper can used in the whole app for sending mail , push  , payment etc work.
 * function with anysc , await or without anysc awit .
 */

/**
 * first import the configration file after get the all configration
 * send mail , push , file upload etc .
 * when function cal then that file import at moment.
 */
const { config, mails, SMS } = require('../config');
const fs = require('fs');
const crypto = require('crypto');
const https = require('https');
const url = require('url');
const twilio = require('twilio');
const { Mail } = require('./mails');
const { accountSid, authToken, sendNumber } = SMS[SMS.default];
const client = new twilio(accountSid, authToken);
module.exports = {
	send_mail: function (object) {
		const Sendmails = new Mail(mails[mails.default]);
		Sendmails.to(object.to)
			.subject(object.subject)
			.html(object.template, object.data)
			.send();
	},
	mailgun: function () {},
	upload_pic_with_await: function (
		file,
		folder_name = 'uploads/',
		unlink = null
	) {
		try {
			if (!file) {
				return false; // if not getting the image
			} else {
				if (unlink) {
					//
				}

				let upload_path = global.appRoot + '/public/' + folder_name;
				let image = file;
				let image_array = image.mimetype.split('/');
				let extension = image_array[image_array.length - 1];
				var timestamp = parseInt(new Date().getTime());
				if (extension === 'plain') {
					extension = 'mp4';
				}
				image.mv(
					upload_path + '/' + timestamp + '.' + extension,
					function (err) {
						if (err) {
							// eslint-disable-next-line no-console
							console.log(err);
						} else {
							// eslint-disable-next-line no-console
							console.log('file_uploaded');
						}
					}
				);
				return timestamp + '.' + extension;
			}
		} catch (err) {
			console.log(err);
			throw { code: 415, message: JSON.stringify(err) };
		}
	},
	send_push: function (data) {
		//const { FCM } = require('push-notification-node');
		const GOOGLE_KEY = config.GOOGLE_KEY; //put your server key here
		const headers = {
			Authorization: `key=${GOOGLE_KEY}`,
			'Content-Type': 'application/json',
		};
		let pushObject;
		if (data.device_type !== 1) {
			pushObject = {
				to: data.token,
				notification: {
					body: data.message,
					title: config.App_name,
					priority: 'high',
				},
				data,
			};
		} else {
			pushObject = {
				registration_ids: [data.token],
				data,
			};
		}
		console.log(pushObject);
		POST(
			'https://fcm.googleapis.com/fcm/send',
			JSON.stringify(pushObject),
			headers
		)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
		// const fcm = new FCM(GOOGLE_KEY);
		// const body = {
		// 	body: data.message,
		// 	title: config.App_name,
		// 	notification_code: data.notification_code,
		// 	data
		// };
		// console.log(body);
		// fcm
		// 	.sendPromise(data.token, body)
		// 	.then((res) => {
		// 		console.log(res);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	},
	send_push_apn: function () {},
	paypal: async function () {},
	stripe: async function () {},
	brain_tree: async function () {},
	sendSMS: (data) => {
		client.messages
			.create({
				body: data.message,
				to: '+' + data.to, // Text this number
				from: sendNumber, // From a valid Twilio number
			})
			.then((message) => console.log(message.sid))
			.catch((err) => {
				console.log(err);
			});
	},
	error: function (res, err) {
		try {
			let code =
				typeof err === 'object'
					? err.hasOwnProperty('code')
						? err.code
						: 500
					: 403;
			let message =
				typeof err === 'object'
					? err.hasOwnProperty('message')
						? err.message
						: err
					: err;
			res.status(code).json({
				success: false,
				error_message: message,
				code: code,
				data: [],
			});
		} catch (error) {
			res.status(500).json(error);
		}
	},
	IsJsonString: (str) => {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	},
	success: function (res, data) {
		res.json({
			success: true,
			message: data.message,
			code: 200,
			data: data.data,
		});
	},
	loadModel: function (file_name = null) {
		try {
			if (fs.existsSync(config.root_path + 'model/' + file_name + '.js')) {
				let models = require('../model/' + file_name);
				return new models();
			} else {
				let message =
					'Model ' +
					file_name +
					' Not Found on the server.Please create the ' +
					file_name +
					' in model folder.';
				throw { code: 404, message };
			}
		} catch (err) {
			throw err;
		}
	},

	createToken() {
		let key = 'abc' + new Date().getTime();
		return crypto.createHash('sha1').update(key).digest('hex');
	},
	addUrl(data, key, folder = 'uploads') {
		if (data.length === 0) {
			return [];
		}
		data.forEach((element, keys) => {
			if (!Array.isArray(key)) {
				if (data[keys][key].length > 0) {
					data[keys][key] = global.appURL + folder + '/' + data[keys][key];
				}
			} else {
				for (const names of key) {
					if (data[keys][names].length > 0) {
						data[keys][names] =
							global.appURL + folder + '/' + data[keys][names];
					}
				}
			}
		});
		return data;
	},
	createHash(key, hash = 'sha1') {
		return crypto.createHash(hash).update(key).digest('hex');
	},
	UserToken: function (id, req) {
		const clientIp = req.connection.remoteAddress;
		const { isMobile, isDesktop, browser, version, os, platform, source } =
			req.useragent;
		let token =
			id +
			clientIp +
			isMobile +
			isDesktop +
			os +
			version +
			platform +
			source +
			browser;
		return this.createHash(token);
	},
	ImageUrl(name, folder = 'uploads') {
		return global.appURL + folder + '/' + name;
	},
	randomNumber() {
		return Math.floor(1000 + Math.random() * 9000);
	},
	get currentTime() {
		return Math.round(new Date().getTime() / 1000, 0);
	},
	unixTimeStamp(date) {
		return Math.round(new Date(date).getTime() / 1000, 0);
	},
	convertTimeZone(date, timeZone) {
		return new Date(date.toLocaleString('en-US', { timeZone }));
	},
	getCurrentDay(date) {
		const allDays = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];
		const today = new Date(date * 1000).getDay();
		return allDays[today];
	},
};

function POST(apiUrl, data, headers) {
	return new Promise((resolve, reject) => {
		const host = url.parse(apiUrl).hostname;
		const path = url.parse(apiUrl).pathname;
		const options = {
			host,
			path,
			method: 'post',
			headers,
		};
		const request = https.request(options, function (res) {
			res.setEncoding('utf-8');
			let responseString = '';
			res.on('data', function (data) {
				responseString += data;
			});
			request.on('error', function (error) {
				reject(error);
			});
			res.on('end', function () {
				resolve(responseString);
			});
		});
		request.write(data);
		request.end();
	});
}
