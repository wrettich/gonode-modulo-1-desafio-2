const { Project, Section } = require('../models');

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
			const project = await Project.findOne({
				include: [Section],
			 	where: {id: req.params.id}
			});

			return res.render('projects/show', {user , project});

		} catch (err) {
			next(err);
		}

	},

	async destroy(req, res, next) {
		try {

			await Project.destroy({ where: { id: req.params.id } });

			req.flash('success', 'Projeto deletado com sucesso');
			res.redirect('/app/dashboard');

		} catch (err) {
			return next();
		}

	},
};
