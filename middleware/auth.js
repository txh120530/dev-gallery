const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(role='guest') {

 return async function(req, res, next) {
	// Get token from header
	const token = req.header('x-auth-token');


	// Check if no token
	if(!token){
		return res.status(401).json({msg: 'No token, authorization denied'});
	}

	// Verify token
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		req.user = decoded.user;
		let userInfo = await User.findById(req.user.id);
		const userRoles = userInfo.roles;

		if(userRoles.includes('admin')){
			console.log("Admin");
			return next();
		}
		
		switch(role){
			case 'editor':
				if(userRoles.includes(role)){
					return next();
				}
				return res.status(401).json({msg: 'You do not have permission to view this content'});
			default: 
				next();
		}

	}	catch(err){
		return res.status(401).json({msg: 'Token not valid'});
	}
}
}