'use strict'

const express = require('express');
const routes = express.Router();
const tournamantsController = require('../controllers/tournamentsController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    // Accept file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(new Error('No se puede subir este tipo de archivo solo jpeg y png'));
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
});

routes.get('/', tournamantsController.getAll);
routes.get('/actives', tournamantsController.getActives);
routes.get('/:id', tournamantsController.getById);
routes.get('/:id/dates', tournamantsController.getDatesByTournament);
routes.get('/:id/groups', tournamantsController.getTournamentGroupsByTournament);
routes.post('/', upload.single('logoImage'), tournamantsController.create);
routes.put('/:id', upload.single('logoImage'), tournamantsController.update);
routes.delete('/:id', tournamantsController.delete);

module.exports = routes;
