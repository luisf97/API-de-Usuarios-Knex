const routes = require('express').Router();
const User = require('../controllers/UsersController');

routes.get('/user', User().index);
routes.get('/user/:id', User().findUserById);
routes.post('/user', User().create);
routes.put('/user', User().edit);
routes.delete('/user/:id', User().delete);

module.exports = routes