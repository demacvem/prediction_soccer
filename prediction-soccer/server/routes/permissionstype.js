'use strict'

const express = require('express');
const routes = express.Router();
const permissionsTypeController = require('../controllers/permissionstypeController');

routes.get('/', permissionsTypeController.getAll);
routes.get('/:id/permissions', permissionsTypeController.getByPermissionTypeId);
routes.get('/:id', permissionsTypeController.getById);
routes.post('/', permissionsTypeController.create);
routes.put('/:id', permissionsTypeController.update);
routes.delete('/:id', permissionsTypeController.delete);

module.exports = routes;