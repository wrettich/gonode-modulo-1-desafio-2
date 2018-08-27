const { Project } = require('../models');

module.exports = {

	async index(req, res, next) {
		try {

			const user = req.session.user;

			const projects = await Project.findAll({ where: { UserId: req.session.user.id }});

			return res.render('user/dashboard', { user, projects });

		} catch (err) {
			next(err);
		}

	},
};
