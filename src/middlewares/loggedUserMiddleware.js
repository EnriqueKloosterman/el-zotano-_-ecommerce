const db = require('../database/models');

async function loggedUserMiddleware(req, res, next) {
	res.locals.userLoggedIn = false;

	if(req.cookies.userEmail){
		let emailInCookie = req.cookies.userEmail;

		let userFromCookie = await db.Users.findOne({
            where:{
                'email': emailInCookie,
            }
		}).catch(function(errors){
			console.log(errors);
		});
		
		if (userFromCookie) {
			req.session.userLogged = userFromCookie;
		}
	}

	if (req.session.userLogged) {
		res.locals.userLoggedIn = true;
		res.locals.userLogged = req.session.userLogged;
	}

	next();
}

module.exports = loggedUserMiddleware;