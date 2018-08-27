module.exports = (req, res, next) => {
	if (req.session && req.session.user) {
		return next();
	}

	req.flash('error', 'Usuario não autorizado');
	return res.redirect('/');
};
