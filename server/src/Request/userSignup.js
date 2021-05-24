const { vaildation } = require('../../utils/DataValidation');
const app = require('../../libary/CommanMethod');
module.exports = async (Request, res, next) => {
	const requried = {
		name: Request.body.name,
		email: Request.body.email,
		password: Request.body.password,
		phone: Request.body.phone,
		userType: Request.body.userType,
		checkexist: 1,
	};
	const nonRequired = {
		device_type: Request.body.device_type,
		device_token: Request.body.device_token,
		description: Request.body.description,
		location: Request.body.location,
		longitude: Request.body.longitude,
		latitude: Request.body.latitude,
		about_us: Request.body.about_us,
		authorization_key: app.createToken(),
		otp: 1111, //app.randomNumber(),
	};
	try {
		// if (parseInt(requried.userType) === 1) {
		// 	Object.assign(requried, {
		// 		serviceId: Request.body.serviceId,
		// 		workingExperience: Request.body.workingExperience,
		// 		working_hours: Request.body.working_hours,
		// 	});
		// }
		Request.RequestData = await vaildation(requried, nonRequired);
		next();
	} catch (err) {
		return app.error(res, err);
	}
};
