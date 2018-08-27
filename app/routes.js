const express = require('express');
const routes = express.Router();
const authController = require('./controllers/authController');
const dashboardController = require('./controllers/dashboardController');
const projectController = require('./controllers/projectController');
const sectionController = require('./controllers/sectionController');

const authMiddleware = require('./middlewares/auth');
const guestMiddleware = require('./middlewares/guest');

routes.use((req, res, next) => {
	res.locals.flashSuccess = req.flash('success');
	res.locals.flashError = req.flash('error');

	next();
});

/**
 * Auth
 */
routes.get('/', guestMiddleware, authController.signin);
routes.get('/signup', guestMiddleware, authController.signup);
routes.get('/signout', authController.signout);
routes.post('/register', guestMiddleware, authController.register);
routes.post('/authenticate', authController.authenticate);

// checa se usuário está logado
routes.use('/app', authMiddleware);

/**
 * Dashboard
 */
routes.get('/app/dashboard',  dashboardController.index);

/**
 * Projects
 */
routes.get('/app/projects/:id', projectController.show);
routes.delete('/app/projects/:id', projectController.destroy);
routes.post('/app/projects/create', projectController.store);

/**
 * Sections
 */
routes.get('/app/projects/:projectId/sections/:id', sectionController.show);
routes.put('/app/projects/:projectId/sections/:id', sectionController.update);
routes.delete('/app/projects/:projectId/sections/:id', sectionController.destroy);
routes.post('/app/projects/:projectId/sections/create', sectionController.store);


routes.use((req, res) => res.render('errors/404'));

routes.use((err, req, res, next) => {
	res.status(err.status || 500);

	return res.render('errors/index', {
		message: err.message,
		error: process.env.NODE_ENV === 'production' ? {} : err,
	});
});

module.exports = routes;
