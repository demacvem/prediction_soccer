'use strict'

const express = require('express');
const routes = express.Router();
const teamsController = require('../controllers/teamsCotroller');
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
        cb(new Error('No se puede subir este tipo de archivo'));
    }
};

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
});

routes.get('/', teamsController.getAll);
routes.get('/:id', teamsController.getById);
routes.post('/', upload.single('logoImage'), teamsController.create);
routes.put('/:id', upload.single('logoImage'), teamsController.update);
routes.delete('/:id', teamsController.delete);

module.exports = routes;
