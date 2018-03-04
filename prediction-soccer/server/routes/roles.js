'use strict'

const express = require('express');
const routes = express.Router();
const rolesController = require('../controllers/rolesController');

routes.get('/', rolesController.getAll);
routes.get('/actives', rolesController.getActives);
routes.get('/:id', rolesController.getById);
routes.post('/', rolesController.create);
routes.put('/:id', rolesController.update);
routes.delete('/:id', rolesController.delete);

module.exports = routes;