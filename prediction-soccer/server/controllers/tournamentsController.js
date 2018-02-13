'use strict'

const mongoose = require('mongoose');
const Tournament = require('../models/tournament');
const _Date = require('../models/date');

exports.getAll = (req, res, next) => {
    Tournament.find()
        .exec()
        .then(results => {
            res.status(200).json({
                total: results.length,
                tournaments: results
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Ha ocurrido un error: ${err}`
            });
        });
}

exports.getActives = (req, res, next) => {
    Tournament.find({ isActive: true })
        .exec()
        .then(results => {
            res.status(200).json({
                total: results.length,
                tournaments: results
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Ha ocurrido un error: ${err}`
            });
        });
}

exports.getDatesByTournament = (req, res, next) => {
    let tournamentId = req.params.id;
    _Date.find({ tournament: tournamentId })
        .populate("tournament", "name")
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
    Tournament
        .findById(id)
        .exec()
        .then(result => {
            if(!result){
                return res.status(404).json({ message: 'El registro no existe' });
            }

            res.status(200).json({
                tournament: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Ha ocurrido un error: ${err}`
            });
        });
}

exports.create = (req, res, next) => {
    const tournament = new Tournament({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        logo: req.file.path,
        order: req.body.order,
        isActive: req.body.isActive
    });

    tournament.save()
        .then(result => {
            res.status(201).json({
                message: "Created tournament successfully",
                createdLeagues: {
                    _id: result._id,
                    name: result.name,
                    logo: result.logo,
                    order: result.order,
                    isActive: result.isActive,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/tournaments/" + result._id
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
        logo: req.file.path,
        order: req.body.order,
        isActive: req.body.isActive,
        updatedAt: Date.now()
    };
    Tournament.update({ _id: id }, model)
        .then(result => {
            res.status(200).json({
                message: "Updated tournaments successfully"
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
    Tournament.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Tournament deleted",
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

