const ApiController = require('./ApiController');
const Db = require('../../../libary/sqlBulider');
const app = require('../../../libary/CommanMethod');
const apis = new ApiController();
const DB = new Db();

module.exports = {
	allServices: async (Request) => {
		const { page, limit, q = '' } = Request.query;
		const offset = (page - 1) * limit;
		let conditions = ``;
		if (q) {
			conditions += ` where name like '%${q}%' `;
		}
		const query = `select * from services ${conditions} order by id desc limit ${offset}, ${limit}`;
		const total = `select count(*) as total from services ${conditions}`;
		const result = {
			pagination: await apis.Paginations(total, offset, limit),
			result: app.addUrl(await DB.first(query), 'image'),
		};
		return result;
	},
	addService: async (Request) => {
		const { body } = Request;
		delete body.image;
		if (Request.files && Request.files.image) {
			body.image = await app.upload_pic_with_await(Request.files.image);
		}
		return await DB.save('services', body);
	},
};
