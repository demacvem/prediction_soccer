'use strict'

const mongoose = require('mongoose');
const TournamentTeam = require('../models/tournamentteam');

exports.getAll = (req, res, next) => {
    TournamentTeam.find()
        .populate("tournamentgroup", "name")
        .populate("team", "name")
        .exec()
        .then(results => {
            res.status(200).json({
                total: results.length,
                tournamentTeams: results
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
    TournamentTeam
        .findById(id)
        .populate("tournamentgroup", "name")
        .populate("team", "name")
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({ message: 'El registro no existe' });
            }

            res.status(200).json({
                tournamentTeam: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Ha ocurrido un error: ${err}`
            });
        });
}

exports.create = (req, res, next) => {
    const tournamentTeam = new TournamentTeam({
        _id: new mongoose.Types.ObjectId(),
        tournamentgroup: req.body.tournamentgroup,
        team: req.body.team
    });

    tournamentTeam.save()
        .then(result => {
            res.status(201).json({
                message: "Created tournamentTeam successfully",
                createdLeagues: {
                    _id: result._id,
                    tournamentgroup: result.tournamentgroup,
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
                        url: "http://localhost:3000/tournamentteams/" + result._id
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
        tournamentgroup: req.body.tournamentgroup,
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

    TournamentTeam.update({ _id: id }, model)
        .then(result => {
            res.status(200).json({
                message: "Updated tournamentteam successfully"
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
    TournamentTeam.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "TournamentTeam deleted",
                request: {
                    type: "POST",
                    url: "http://localhost:3000/tournamentteams",
                    body: { tournamentgroup: "String", team: "String" }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};