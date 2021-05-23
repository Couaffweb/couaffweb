const Db = require('../../libary/sqlBulider');
const app = require('../../libary/CommanMethod');
const DB = new Db();
const UserAuth = async (req, res, next) => {
	try {
		if (!res.auth) {
			return next();
		}
		if (!req.headers.hasOwnProperty('authorization')) {
			// eslint-disable-next-line no-throw-literal
			throw { code: 400, message: 'Authorization key is required' };
		}
		let user_details = await DB.find('users', 'first', {
			conditions: {
				authorization_key: req.headers.authorization,
			},
			fields: [
				'id',
				'name',
				'status',
				'email',
				'phone',
				'location',
				'profile',
				'otp',
				'password',
				'authorization_key',
				'stripe_id',
				'stripe_connect',
				'userType',
				'walletAmount',
			],
		});
		if (user_details) {
			req.body.user_id = user_details.id;
			req.body.userInfo = user_details;
			return next();
		}
		// eslint-disable-next-line no-throw-literal
		throw { code: 401, message: 'Invaild Authorization' };
	} catch (err) {
		return app.error(res, err);
	}
};

module.exports = UserAuth;
