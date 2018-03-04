'use strict'

const mongoose = require('mongoose');
const Role = require('../models/role');

exports.getAll = (req, res, next) => {
    Role.find()
        .exec()
        .then(results => {
            res.status(200).json({
                total: results.length,
                roles: results
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Ha ocurrido un error: ${err}`
            });
        });
}

exports.getActives = (req, res, next) => {
    Role.find({ isActive: true })
        .exec()
        .then(results => {
            res.status(200).json({
                total: results.length,
                roles: results
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
    Role
        .findById(id)
        .exec()
        .then(result => {
            if(!result){
                return res.status(404).json({ message: 'El registro no existe' });
            }

            res.status(200).json({
                role: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Ha ocurrido un error: ${err}`
            });
        });
}

exports.create = (req, res, next) => {
    const role = new Role({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        isActive: req.body.isActive
    });

    role.save()
        .then(result => {
            res.status(201).json({
                message: "Created role successfully",
                createdRole: {
                    _id: result._id,
                    name: result.name,
                    isActive: result.isActive,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/roles/" + result._id
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
    let model = {
        name: req.body.name,
        isActive: req.body.isActive
    };
    Role.update({ _id: id }, model)
        .then(result => {
            res.status(200).json({
                message: "Updated roles successfully"
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
    Role.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Role deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/roles",
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

