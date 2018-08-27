const { Project, Section } = require('../models');

module.exports = {

	async store(req, res, next) {
		try {

			const section = await Section.create({ ...req.body, ProjectId: req.params.projectId });

			req.flash('success', 'Seção cadastrada com sucesso');
			return res.redirect(`/app/projects/${req.params.projectId}/sections/${section.id}`);

		} catch (err) {
			next(err);
		}

	},

	async update(req, res, next) {
		try {

			const section = await Section.findById(req.params.id);
			await section.update(req.body);

			req.flash('success', 'Seção atualizada com sucesso');
			return res.redirect(`/app/projects/${req.params.projectId}/sections/${section.id}`);

		} catch (err) {
			next(err);
		}

	},

	async destroy(req, res, next) {

		try {

			await Section.destroy({ where: { id: req.params.id } });

			req.flash('success', 'Snippet deletado com sucesso');
			res.redirect(`/app/projects/${req.params.projectId}`);

		} catch (err) {
			return next();
		}
	},

	async show(req, res, next) {
		try {

			const { projectId, id} = req.params;

			user = req.session.user;
			const project = await Project.findOne({
				include: [Section],
				where: { id: projectId}
			});

			const section = await Section.findById(id);

			return res.render('projects/section', { user, project, currentSection: section});

		} catch (err) {
			next(err);
		}

	},
};
