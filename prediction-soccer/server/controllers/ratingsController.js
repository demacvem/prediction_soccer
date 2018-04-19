'use strict'

const mongoose = require('mongoose');
const Rating = require('../models/rating');

exports.getAll = (req, res, next) => {
    Rating.find()
        .populate("tournament", "name")
        .populate("team", "name")
        .exec()
        .then(results => {
            res.status(200).json({
                total: results.length,
                ratings: results
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
    Rating
        .findById(id)
        .populate("tournament", "name")
        .populate("team", "name")
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({ message: 'El registro no existe' });
            }

            res.status(200).json({
                rating: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Ha ocurrido un error: ${err}`
            });
        });
}

exports.create = (req, res, next) => {
    const rating = new Rating({
        _id: new mongoose.Types.ObjectId(),
        tournament: req.body.tournament,
        team: req.body.team
    });

    rating.save()
        .then(result => {
            res.status(201).json({
                message: "Created rating successfully",
                createdLeagues: {
                    _id: result._id,
                    tournament: result.tournament,
                    team: result.team,
                    matchesPlayed: result.matchesPlayed,
                    matchesWon: result.matchesWon,
                    matchesTied: result.matchesTied,
                    matchesLost: result.matchesLost,
                    favorGoals: result.favorGoals,
                    againtsGoals: result.againtsGoals,
                    points: result.points,
                    position: result.position,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/ratings/" + result._id
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
        tournament: req.body.tournament,
        team: req.body.team,
        matchesPlayed: req.body.matchesPlayed,
        matchesWon: req.body.matchesWon,
        matchesTied: req.body.matchesTied,
        matchesLost: req.body.matchesLost,
        favorGoals: req.body.favorGoals,
        againtsGoals: req.body.againtsGoals,
        points: req.body.points,
        position: req.body.position
    };

    Rating.update({ _id: id }, model)
        .then(result => {
            res.status(200).json({
                message: "Updated rating successfully"
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
    Rating.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Rsting deleted",
                request: {
                    type: "POST",
                    url: "http://localhost:3000/ratings",
                    body: { tournament: "String", team: "String" }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};