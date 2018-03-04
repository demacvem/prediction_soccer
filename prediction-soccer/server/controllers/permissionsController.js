'use strict'

const mongoose = require('mongoose');
const Permission = require('../models/permission');

exports.getAll = (req, res, next) => {
    Permission.find()
        .populate("permissionType", "name")
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

exports.getActives = (req, res, next) => {
    Permission.find({ isActive: true })
        .populate("permissionType", "name")
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
    Permission
        .findById(id)
        .populate("permissionType", "name")
        .exec()
        .then(result => {
            if(!result){
                return res.status(404).json({ message: 'El registro no existe' });
            }

            res.status(200).json({
                permission: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Ha ocurrido un error: ${err}`
            });
        });
}

exports.create = (req, res, next) => {
    const permission = new Permission({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        permissionType: req.body.permissionType,
        isActive: req.body.isActive
    });

    permission.save()
        .then(result => {
            res.status(201).json({
                message: "Created permission successfully",
                createdRole: {
                    _id: result._id,
                    name: result.name,
                    permissionType: result.permissionType,
                    isActive: result.isActive,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/permissions/" + result._id
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
        permissionType: req.body.permissionType,
        isActive: req.body.isActive
    };
    Permission.update({ _id: id }, model)
        .then(result => {
            res.status(200).json({
                message: "Updated permission successfully"
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
    Permission.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Permission deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/permissions",
            body: { name: "String", permissionType: "String", isActive: "Boolean" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };

