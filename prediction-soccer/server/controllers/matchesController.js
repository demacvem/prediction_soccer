'use strict'

const mongoose = require('mongoose');
const Match = require('../models/match');

exports.getAll = (req, res, next) => {
    Match.find()
        .populate("journey", "name")
        .populate("localTeam", "name")
        .populate("visitorTeam", "name")
        .populate("status", "name")
        .exec()
        .then(results => {
            res.status(200).json({
                total: results.length,
                matches: results
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
    Match
        .findById(id)
        .populate("journey", "name")
        .populate("localTeam", "name")
        .populate("visitorTeam", "name")
        .populate("status", "name")
        .exec()
        .then(result => {
            if (!result) {
                return res.status(404).json({ message: 'El registro no existe' });
            }

            res.status(200).json({
                match: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Ha ocurrido un error: ${err}`
            });
        });
}

exports.create = (req, res, next) => {
    const match = new Match({
        _id: new mongoose.Types.ObjectId(),
        journey: req.body.journey,
        _date: req.body._date,
        _time: req.body._time,
        localTeam: req.body.localTeam,
        visitorTeam: req.body.visitorTeam,
        status: req.body.status,
    });

    match.save()
        .then(result => {
            res.status(201).json({
                message: "Created matches successfully",
                createdLeagues: {
                    _id: result._id,
                    journey: result.journey,
                    _date: result._date,
                    _time: result._time,
                    localTeam: result.localTeam,
                    visitorTeam: result.visitorTeam,
                    localGoals: result.localGoals,
                    visitorGoals: result.visitorGoals,
                    status: result.status,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/matches/" + result._id
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
        journey: req.body.journey,
        _date: req.body._date,
        _time: req.body._time,
        localTeam: req.body.localTeam,
        visitorTeam: req.body.visitorTeam,
        localGoals: req.body.localGoals,
        visitorGoals: req.body.visitorGoals,
        status: req.body.status,
    };

    Match.update({ _id: id }, model)
        .then(result => {
            res.status(200).json({
                message: "Updated match successfully"
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
    Match.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Match deleted",
                request: {
                    type: "POST",
                    url: "http://localhost:3000/matches",
                    body: { 
                        journey: "String", 
                        _date: "Date",
                        _time: "String",
                        localTeam: "String",
                        visitorTeam: "String",
                        status: "String"
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