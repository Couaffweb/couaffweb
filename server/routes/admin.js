const express = require('express');
const router = express.Router();
const {
	AdminController,
	ServiceController,
} = require('../src/Controller/admin/index');
const { cross, AdminAuth } = require('../src/middleware/index');
const response = require('../libary/Response');
const Admin = new AdminController();

router.use([cross, AdminAuth]);
router.get('/', function (req, res) {
	res.json(' APi workings ');
});
router.post('/login', Admin.login);
router.post('/send-push', response(Admin.Notification));
router.get('/dashboard', response(Admin.dashboard));
router
	.route('/users')
	.get(response(Admin.allUser))
	.post(response(Admin.addUser))
	.put(response(Admin.editUser))
	.delete(response(Admin.deleteData));
router
	.route('/services')
	.get(response(ServiceController.allServices))
	.post(response(ServiceController.addService))
	.put(response(ServiceController.addService))
	.delete(response(Admin.deleteData));
router.post('/admin-profile', response(Admin.adminProfile));
router.put('/update-status', response(Admin.updateData));
router
	.route('/app-info/')
	.get(response(Admin.appInfo))
	.put(response(Admin.updateData));

module.exports = router;
