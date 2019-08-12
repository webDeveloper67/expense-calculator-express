const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
	const token = req.header('x-auth-token');

	if (!token) {
		return res.status(401).json({msg: 'No token, authorization denied'});
	}

	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.user = decoded.user;

		next();
	} catch (err) {
		res.status(401).json({msg: 'Token is not valid'});
	}
};

/*
	The console.log(decoded) returned 

	{ id: '5d4d0c5319ee9a04cac1a7ad', iat: 1565333300, exp: 1565693300 }
*/
