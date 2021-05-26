const missingRoutes = {
	'app-information': 'GET',
	'forgot-password': 'POST',
	'user/login': 'POST',
	'user/signup': 'POST',
	'user/soical-login': 'POST',
	goals: 'GET',
	category_details: 'GET',
	articles: 'GET',
	categories: 'GET',
	'question-categoires': 'GET',
	'home-feeds': 'GET',
	services: 'GET',
	'top-rated': 'GET',
	'massager/services': 'GET',
	'service-search': 'GET',
	'near-massager': 'GET',
	'contact-us': 'GET',
	rating: 'GET',
};
const AuthSkip = (Req, res, next) => {
	res.auth = true;
	const url = makeUrl(Req);
	if (
		(!Req.headers.hasOwnProperty('authorization') ||
			Req.headers.authorization.length === 0) &&
		missingRoutes.hasOwnProperty(url)
	) {
		if (Req.method === missingRoutes[url] || missingRoutes[url] === 'ALL') {
			res.auth = false;
		}
	}
	next();
};

const makeUrl = (Req) => {
	let url = Req.path.split('/');
	url.shift();
	if (url.indexOf(Req.lang) !== -1) {
		url.pop();
	}
	if (!isNaN(url[url.length - 1])) {
		url.pop();
	}
	return (url = url.join('/'));
};

module.exports = AuthSkip;
