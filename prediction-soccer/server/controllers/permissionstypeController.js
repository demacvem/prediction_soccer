'use strict'

const mongoose = require('mongoose');
const PermissionType = require('../models/permissionType');
const Permission = require('../models/permission');

exports.getAll = (req, res, next) => {
    PermissionType.find()
        .exec()
        .then(results => {
            res.status(200).json({
                total: results.length,
                permissionsType: results
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Ha ocurrido un error: ${err}`
            });
        });
}

exports.getByPermissionTypeId = (req, res, next) => {
    let permissionTypeId = req.params.id;
    console.log(permissionTypeId);
    Permission.find({ permissionType: permissionTypeId, isActive: true})
        .exec()
        .then(results => {
            res.status(200).json({
                total: results.length,
                permissions: results
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
    PermissionType
        .findById(id)
        .exec()
        .then(result => {
            if(!result){
                return res.status(404).json({ message: 'El registro no existe' });
            }

            res.status(200).json({
                permissionType: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Ha ocurrido un error: ${err}`
            });
        });
}

exports.create = (req, res, next) => {
    const permmissionType = new PermissionType({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    });

    permmissionType.save()
        .then(result => {
            res.status(201).json({
                message: "Created permissionType successfully",
                createdPermissionType: {
                    _id: result._id,
                    name: result.name,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/permissionstype/" + result._id
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
        name: req.body.name
    };
    PermissionType.update({ _id: id }, model)
        .then(result => {
            res.status(200).json({
                message: "Updated permissionType successfully"
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
    PermissionType.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "PermissionType deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/permissionstype",
            body: { name: "String" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };

