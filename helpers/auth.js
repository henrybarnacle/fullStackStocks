module.exports = {
	ensureAuthenticated: function(req, res, next) {
		console.log(req.isAuthenticated());
		if(req.isAuthenticated()) {

			next();

		}
		//res.redirect('/users/register');
	}
}