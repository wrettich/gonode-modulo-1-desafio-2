const { Project } = require('../models');

module.exports = {

	async store(req, res, next) {
		try {
			const project = await Project.create({ ...req.body, UserId: req.session.user.id });

			req.flash('success', 'Projeto cadastrado com sucesso');
			return res.redirect(`/app/projects/${project.id}`);

		} catch (err) {
			next(err);
		}

	},

	async show(req, res, next) {
		try {

			user = req.session.user;
			const project = await Project.findById(req.params.id);

			return res.render('projects/show', {user , project});

		} catch (err) {
			next(err);
		}

	},
};
