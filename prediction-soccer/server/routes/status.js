'use strict'

const express = require('express');
const routes = express.Router();
const statusController = require('../controllers/statusController');

routes.get('/', statusController.getAll);
routes.get('/actives', statusController.getActives);
routes.get('/:id', statusController.getById);
routes.post('/', statusController.create);
routes.put('/:id', statusController.update);
routes.delete('/:id', statusController.delete);

module.exports = routes;
