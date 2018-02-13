'use strict'

const mongoose = require('mongoose');
const _Date = require('../models/date');

exports.getAll = (req, res, next) => {
    _Date.find()
        .populate("tournament" ,"name")
        .exec()
        .then(results => {
            res.status(200).json({
                total: results.length,
                dates: results
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
    _Date
        .findById(id)
        .populate("tournament" ,"name")
        .exec()
        .then(result => {
            if(!result){
                return res.status(404).json({ message: 'El registro no existe' });
            }

            res.status(200).json({
                date: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Ha ocurrido un error: ${err}`
            });
        });
}

exports.create = (req, res, next) => {
    const date = new _Date({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        tournament: req.body.tournament
    });

    date.save()
        .then(result => {
            res.status(201).json({
                message: "Created dates successfully",
                createdLeagues: {
                    _id: result._id,
                    name: result.name,
                    tournament: result.tournament,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/dates/" + result._id
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
        tournament: req.body.tournament
    };
    _Date.update({ _id: id }, model)
        .then(result => {
            res.status(200).json({
                message: "Updated dates successfully"
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
    _Date.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Date deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/tournaments",
            body: { name: "String", logoImage: "String", order: "Number", isActive: "Boolean" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };

