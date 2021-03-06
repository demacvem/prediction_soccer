'use strict'

const mongoose = require('mongoose');
const Status = require('../models/status');

exports.getAll = (req, res, next) => {
    Status.find({})
        .exec()
        .then(results => {
            res.status(200).json({
                total: results.length,
                status: results
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Ha ocurrido un error: ${err}`
            });
        });
}

exports.getActives = (req, res, next) => {
    Status.find({ isActive: true })
        .exec()
        .then(results => {
            res.status(200).json({
                total: results.length,
                status: results
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Ha ocurrido un error: ${err}`
            });
        });
}

exports.getById = (req, res, next) => {
    let id = req.params.id;
    Status
        .findById(id)
        .exec()
        .then(result => {
            if(!result){
                return res.status(404).json({ message: 'El registro no existe' });
            }

            res.status(200).json({
                status: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Ha ocurrido un error: ${err}`
            });
        });
}

exports.create = (req, res, next) => {
    const status = new Status({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        isActive: req.body.isActive
    });
    status.save()
        .then(result => {
            res.status(201).json({
                message: "Created status successfully",
                createdStatus: {
                    _id: result._id,
                    name: result.name,
                    isActive: result.isActive,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/status/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.update = (req, res, next) => {
    let id = req.params.id;
    let model = req.body;
    Status.update({ _id: id }, model)
        .then(result => {
            res.status(200).json({
                message: "Updated status successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.delete = (req, res, next) => {
    const id = req.params.id;
    Status.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Status deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/status",
            body: { name: "String", isActive: "Boolean" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };

