
async function adminAccessMiddleware(req, res, next){
    if(!req.session.userLogged || req.session.userLogged && req.session.userLogged.role !== 1 ){
        await res.redirect('/');
    }
    next();
}

module.exports = adminAccessMiddleware;