const ApiController = require('./ApiController');
const Db = require('../../../libary/sqlBulider');
const app = require('../../../libary/CommanMethod');
const ApiError = require('../../Exceptions/ApiError');
const apis = new ApiController();
const DB = new Db();

module.exports = {
	addService: async ({
		files = {},
		body: {
			name,
			price,
			category_id,
			user_id,
			userInfo: { userType },
		},
	}) => {
		const data = await apis.vaildation({
			name,
			price,
			category_id,
			userId: user_id,
			isAdmin: 0,
		});
		if (files && files.image) {
			data.image = await app.upload_pic_with_await(files.image);
		}
		data.id = await DB.save('services', data);
		await DB.save('user_services', {
			userId: user_id,
			serviceId: data.id,
			userType,
		});
		return {
			status: 201,
			message: 'Service Added successfully',
			data,
		};
	},
	editService: async ({
		files = {},
		body: { name, price, description, user_id },
		params: { serviceId },
	}) => {
		const data = await apis.vaildation(
			{ serviceId },
			{
				name,
				price,
				description,
				userId: user_id,
				isAdmin: 0,
			}
		);
		const checkService = await DB.find('services', 'first', {
			conditions: {
				id: serviceId,
				userId: user_id,
			},
		});
		if (!checkService) throw new ApiError('Invaild service id', 404);
		if (files && files.image) {
			data.image = await app.upload_pic_with_await(files.image);
		}

		data.id = serviceId;
		data.id = await DB.save('services', data);
		return {
			message: 'Service edited successfully',
			data,
		};
	},
	removeService: async ({ params: { serviceId }, body: { user_id } }) => {
		const checkServiceBooking = await DB.find('bookServices', 'first', {
			conditions: {
				FIND_IN_SET: [serviceId, 'services_ids'],
				raw: [` date > ${app.currentTime} and massagerId=${user_id}`],
			},
		});
		if (checkServiceBooking)
			throw new ApiError(
				'you will not able to remove this sevice beaucse someone already booked for future ',
				403
			);
		await DB.first(
			`delete from user_services where serviceId=${serviceId} and userId=${user_id}`
		);
		await DB.first(
			`delete from services where id=${serviceId} and userId=${user_id}`
		);
		return {
			message: 'Remove the service successfully',
			data: [],
		};
	},
	allService: async ({
		query: { limit = 20, page = 1, search = '' },
		body: { user_id = 0 },
	}) => {
		const offset = (page - 1) * limit;
		let conditions = `where services.status = 1 and isAdmin=1 or userId=${user_id}`;
		if (search) {
			conditions += ` and name like '%${search}%' `;
		}
		const query = `select * from services ${conditions} order by id desc limit ${offset}, ${limit}`;
		const total = `select count(*) as total from services ${conditions}`;
		const result = {
			pagination: await apis.QueryPaginations(total, offset, limit),
			result: app.addUrl(await DB.first(query), 'image'),
		};
		return {
			message: 'Category listing',
			data: result,
		};
	},
	userAddServices: async ({
		query: { limit = 20, page = 1, search = '' },
		body: { user_id },
	}) => {
		const offset = (page - 1) * limit;
		let conditions = `where services.status = 1 and userId=${user_id} `;
		if (search) {
			conditions += ` and name like '%${search}%' `;
		}
		const query = `select * from services ${conditions} order by id desc limit ${offset}, ${limit}`;
		const total = `select count(*) as total from services ${conditions}`;
		const result = {
			pagination: await apis.QueryPaginations(total, offset, limit),
			result: app.addUrl(await DB.first(query), 'image'),
		};
		return {
			message: 'User Service listing',
			data: result,
		};
	},
	usersServices: async ({
		params: { massagerId },
		query: { limit = 20, page = 1, search = '' },
	}) => {
		const offset = (page - 1) * limit;
		let conditions = ``;
		if (search) {
			conditions += ` and name like '%${search}%' `;
		}
		const query = `select services.* from services join user_services on (user_services.serviceId = services.id) where user_services.userId =  ${massagerId} and services.status=1 ${conditions} order by id desc limit ${offset}, ${limit}`;
		const total = `select count(*) as total from services join user_services on (user_services.serviceId = services.id) where user_services.userId =  ${massagerId} ${conditions}`;
		const result = {
			massagerInfo: await apis.userDetails(massagerId, true),
			services: {
				pagination: await apis.QueryPaginations(total, offset, limit),
				result: app.addUrl(await DB.first(query), 'image'),
			},
		};
		return {
			message: 'My service listing',
			data: result,
		};
	},
	searchServices: async ({ query: { limit = 20, page = 1, search = '' } }) => {
		if (!search) {
			throw new ApiError('Search field is required', 400);
		}
		const offset = (page - 1) * limit;
		const conditions = ` and name like '%${search}%' `;
		const query = `select services.* from services join user_services on (user_services.serviceId = services.id) where  services.status=1 ${conditions} order by id desc limit ${offset}, ${limit}`;
		const total = `select count(*) as total from services join user_services on (user_services.serviceId = services.id) where services.status=1 ${conditions}`;
		const data = {
			pagination: await apis.QueryPaginations(total, offset, limit),
			result: app.addUrl(await DB.first(query), 'image'),
		};
		return {
			message: 'search listing',
			data,
		};
	},
	getServicesByServiceId: async ({
		body: { user_id },
		params: { ServiceId },
		query: { limit = 20, page = 1, search = '' },
	}) => {
		const offset = (page - 1) * limit;
		let conditions = ``;
		if (search) {
			conditions += ` and (services.name like '%${search}%' or  users.name like '%${search}%')`;
		}
		const query = `select services.*, services.name as serviceName, users.id as userId, users.name, users.profile, users.status, users.email, users.location, users.latitude, users.longitude,users.working_hours, users.workingExperience,
			(select IFNULL(round(avg(rating),1),0) as rating from ratings where massagerId=users.id) as totalRating,
			(select count(*) from favourite_services where userId=${user_id} and massagerId=users.id) as isFav
			from services join user_services on (user_services.serviceId = services.id)
			join users on (users.id = user_services.userId)
			where user_services.serviceId =  ${ServiceId} and users.status=1 and services.status=1 ${conditions} order by id desc limit ${offset}, ${limit}`;
		const total = `select count(*) as total from services join user_services on (user_services.serviceId = services.id) 
		join users on (users.id = user_services.userId) where user_services.serviceId =  ${ServiceId} and users.status=1 ${conditions}`;
		const result = {
			pagination: await apis.QueryPaginations(total, offset, limit),
			result: app.addUrl(await DB.first(query), ['image', 'profile']),
		};
		return {
			message: 'Service listing',
			data: result,
		};
	},
};
