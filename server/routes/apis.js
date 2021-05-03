const express = require('express');
const router = express.Router();
const {
	UserController,
	PaymentController,
	BookingController,
	ServiceController,
} = require('../src/Controller/v1/index');
const { userSignup } = require('../src/Request');
const {
	UserAuth,
	cross,
	Language,
	AuthSkip,
} = require('../src/middleware/index');
const Apiresponse = require('../libary/ApiResponse');
const user = new UserController();

router.use([cross, Language, AuthSkip, UserAuth]);
router.get('/', function (req, res) {
	res.send(' APi workings ');
});

router.post('/user/signup', userSignup, Apiresponse(user.addUser));
router.post('/user/login', Apiresponse(user.loginUser));
router.post('/user/verify', Apiresponse(user.verifyOtp));
router.post('/user/update', Apiresponse(user.updateProfile));
router.post('/user/soical-login', Apiresponse(user.soicalLogin));
router.post('/change-password', Apiresponse(user.changePassword));
router.post('/forgot-password', Apiresponse(user.forgotPassword));
router.post('/logout', Apiresponse(user.logout));
router.post('/user/add-image', Apiresponse(user.addImage));
router.delete(
	'/user/remove-image/:imageId([0-9]+)',
	Apiresponse(user.removeImage)
);
router.get('/app-information', Apiresponse(user.appInfo));
router
	.route('/services')
	.get(Apiresponse(ServiceController.allService))
	.post(Apiresponse(ServiceController.addService));
router.get(
	'/massager/services/:massagerId([0-9]+)',
	Apiresponse(ServiceController.usersServices)
);
router.delete(
	'/remove-service/:serviceId([0-9]+)',
	Apiresponse(ServiceController.removeService)
);
router.put(
	'/edit-service/:serviceId([0-9]+)',
	Apiresponse(ServiceController.editService)
);
router.get('/user/servcies', Apiresponse(ServiceController.userAddServices));
router.get(
	'/services/massager/:ServiceId([0-9]+)',
	Apiresponse(ServiceController.getServicesByServiceId)
);
router
	.route('/rating/:massagerId([0-9]+)?')
	.get(Apiresponse(user.getRating))
	.post(Apiresponse(user.giveRating));
router
	.route('/favourite/massager')
	.get(Apiresponse(user.getFavMassagers))
	.post(Apiresponse(user.favMassager))
	.delete(Apiresponse(user.favMassager));
router.get('/near-massager', Apiresponse(user.getMassagerAccordingtoLocation));
router.post('/service/book', Apiresponse(BookingController.bookService));
router.get('/booked/services', Apiresponse(BookingController.getBookings));
router.get(
	'/booking-details/:bookingId([0-9]+)',
	Apiresponse(BookingController.bookingDetails)
);
router.put('/service/action', Apiresponse(BookingController.acceptBooking));
router.put('/payment/done', Apiresponse(PaymentController.donePayment));
module.exports = router;
