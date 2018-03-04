'use strict'

const mongoose = require('mongoose');
const TournamentGroup = require('../models/tournamentgroup');

exports.getAll = (req, res, next) => {
    TournamentGroup.find()
        .populate("tournament", "name")
        .exec()
        .then(results => {
            res.status(200).json({
                total: results.length,
                tournamentGroups: results
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
    TournamentGroup
        .findById(id)
        .populate("tournament", "name")
        .exec()
        .then(result => {
            if(!result){
                return res.status(404).json({ message: 'El registro no existe' });
            }

            res.status(200).json({
                tournamentGroup: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Ha ocurrido un error: ${err}`
            });
        });
}

exports.create = (req, res, next) => {
    const tournamentGroup = new TournamentGroup({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        tournament: req.body.tournament,
    });

    tournamentGroup.save()
        .then(result => {
            res.status(201).json({
                message: "Created tournamentGroup successfully",
                createdTournamentGroup: {
                    _id: result._id,
                    name: result.name,
                    tournament: result.tournament,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/tournamentgroups/" + result._id
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
    TournamentGroup.update({ _id: id }, model)
        .then(result => {
            res.status(200).json({
                message: "Updated tournamentGroup successfully"
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
    TournamentGroup.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "tournamentGroup deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/tournamentgroups",
            body: { name: "String", tournament: "String" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };

