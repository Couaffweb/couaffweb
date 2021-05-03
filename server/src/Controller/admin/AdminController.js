const Db = require('../../../libary/sqlBulider');
const app = require('../../../libary/CommanMethod');
const ApiError = require('../../Exceptions/ApiError');
let DB = new Db();
const ApiController = require('./ApiController');
class AdminController extends ApiController {
	constructor() {
		super();
		this.limit = 20;
		this.offset = 1;
		this.login = this.login.bind(this);
		this.allUser = this.allUser.bind(this);
	}
	async login(req, res) {
		const { body } = req;
		try {
			const login_details = await DB.find('admins', 'first', {
				conditions: {
					email: body.email,
					status: 1,
				},
			});
			if (login_details) {
				if (app.createHash(body.password) !== login_details.password)
					throw new ApiError('Wrong Email or password');
				delete login_details.password;
				const token = await app.UserToken(login_details.id, req);
				await DB.save('admins', {
					id: login_details.id,
					token,
				});
				login_details.token = token;
				if (login_details.profile) {
					login_details.profile = app.ImageUrl(login_details.profile);
				}
				return app.success(res, {
					message: 'User login successfully',
					data: login_details,
				});
			}
			throw new ApiError('Wrong Email or password');
		} catch (err) {
			app.error(res, err);
		}
	}
	async allUser(Request) {
		const { page, limit, q = '', userType = 0 } = Request.query;
		const offset = (page - 1) * limit;
		let conditions = `where userType =  ${userType}`;
		if (q) {
			conditions += ` and (name like '%${q}%' or email like '%${q}%' or  phone like '%${q}%'`;
		}
		const query = `select * from users ${conditions} order by id desc limit ${offset}, ${limit}`;
		const total = `select count(*) as total from users ${conditions}`;
		const result = {
			pagination: await super.Paginations(total, offset, limit),
			result: app.addUrl(await DB.first(query), ['profile']),
		};
		return result;
	}

	async addUser(Request) {
		const { body } = Request;
		if (body.email) {
			const query = `select * from users where email = '${body.email}'`;
			const email = await DB.first(query);
			if (email.length > 0) {
				throw new ApiError('Email already registered Please use another');
			}
		}
		if (body.phone) {
			const query = `select * from users where phone = '${body.phone}'`;
			const phone = await DB.first(query);
			if (phone.length > 0) {
				throw new ApiError('Phone already registered Please use another');
			}
		}
		if (body.username) {
			const query = `select * from users where username = '${body.username}'`;
			const phone = await DB.first(query);
			if (phone.length > 0) {
				throw new ApiError('Username already registered Please use another');
			}
		}
		delete body.profile;
		body.password = app.createHash(body.password);
		if (Request.files && Request.files.profile) {
			body.profile = await app.upload_pic_with_await(Request.files.profile);
		}
		delete body.licence;
		if (Request.files && Request.files.licence) {
			body.licence = await app.upload_pic_with_await(Request.files.licence);
		}
		return await DB.save('users', body);
	}

	async editUser(Request) {
		const { body } = Request;
		if (body.email) {
			const query = `select * from users where email = '${body.email}' and id != ${body.id}`;
			const email = await DB.first(query);
			if (email.length > 0) {
				throw new ApiError('Email Already registered Please use another');
			}
		}
		if (body.phone) {
			const query = `select * from users where phone = '${body.phone}' and id != ${body.id}`;
			const phone = await DB.first(query);
			if (phone.length > 0) {
				throw new ApiError('Phone Already registered Please use another');
			}
		}
		if (body.username) {
			const query = `select * from users where username = '${body.username}' and id != ${body.id}`;
			const phone = await DB.first(query);
			if (phone.length > 0) {
				throw new ApiError('UserName Already registered Please use another');
			}
		}
		delete body.profile;
		body.password = app.createHash(body.password);
		if (Request.files && Request.files.profile) {
			body.profile = await app.upload_pic_with_await(Request.files.profile);
		}
		return await DB.save('users', body);
	}

	async getBookings(Request) {
		const { page, limit, q = '' } = Request.query;
		const offset = (page - 1) * limit;
		let conditions = ``;
		if (q) {
			conditions += ` where first_name like '%${q}%' or last_name like '%${q}%'
			or email like '%${q}%' or  phone like '%${q}%' or username like '%${q}%'`;
		}
		const query = `select bookings.*, users.first_name, users.last_name, users.email, users.phone, users.profile from bookings
			join users on (users.id = bookings.user_id)
		${conditions} order by id desc limit ${offset}, ${limit}`;
		const total = `select count(*) as total from bookings join users on (users.id = bookings.user_id) ${conditions}`;
		const result = {
			pagination: await super.Paginations(total, offset, limit),
			result: app.addUrl(await DB.first(query), ['profile']),
		};
		return result;
	}

	async adminProfile(Request) {
		const { body } = Request;
		if (body.password === 'empty' || body.password === '') {
			delete body.password;
		} else {
			body.password = app.createHash(body.password);
		}
		delete body.profile;
		if (Request.files && Request.files.profile) {
			body.profile = await app.upload_pic_with_await(Request.files.profile);
		}
		const admin_id = await DB.save('admins', body);
		const admin_info = await DB.first(
			`select * from admins where id = ${admin_id} limit 1`
		);
		if (admin_info[0].profile.length > 0) {
			admin_info[0].profile = app.ImageUrl(admin_info[0].profile);
		}
		return admin_info[0];
	}

	async updateData(req) {
		const { body } = req;
		if (body.id === undefined) {
			throw new ApiError('id is missing', 400);
		}
		if (req.files && req.files.picture) {
			body.picture = await app.upload_pic_with_await(req.files.picture);
		}
		if (req.files && req.files.image) {
			body.image = await app.upload_pic_with_await(req.files.image);
		}
		if (req.files && req.files.profile) {
			body.profile = await app.upload_pic_with_await(req.files.profile);
		}
		return await DB.save(body.table, body);
	}

	async deleteData(req) {
		const { body } = req;
		if (body.id === undefined) {
			throw new ApiError('id is missing', 400);
		}
		return await DB.first(`delete from ${body.table} where id = ${body.id}`);
	}

	async Notification(Request) {
		const { message, tag_id } = Request.body;
		return [
			{
				message: message,
				tag_id,
			},
		];
	}

	async dashboard() {
		const users = await DB.first(
			'select count(id) as total from users where userType = 0'
		);
		const massager = await DB.first(
			'select count(id) as total from users where userType = 1'
		);
		const TotalServices = await DB.first(
			'select count(id) as total from services'
		);
		return {
			total_users: users[0].total,
			total_massagers: massager[0].total,
			total_services: TotalServices[0].total,
		};
	}

	async appInfo() {
		return await DB.first('select * from app_informations');
	}
}

module.exports = AdminController;
