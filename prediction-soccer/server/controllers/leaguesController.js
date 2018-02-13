'use strict'

const mongoose = require('mongoose');
const League = require('../models/league');
const Team = require('../models/team');

exports.getAll = (req, res, next) => {
    League.find()
        .exec()
        .then(results => {
            res.status(200).json({
                total: results.length,
                leagues: results
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Ha ocurrido un error: ${err}`
            });
        });
}

exports.getActives = (req, res, next) => {
    League.find({ isActive: true })
        .exec()
        .then(results => {
            res.status(200).json({
                total: results.length,
                leagues: results
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
    League
        .findById(id)
        .exec()
        .then(result => {
            if(!result){
                return res.status(404).json({ message: 'El registro no existe' });
            }

            res.status(200).json({
                league: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Ha ocurrido un error: ${err}`
            });
        });
}

exports.getTeamsByLeague = (req, res, next) => {
    let leagueId = req.params.id;
    Team.find({ league: leagueId })
        .populate("league", "name")
        .exec()
        .then(results => {
            res.status(200).json({
                total: results.length,
                teams: results
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Ha ocurrido un error: ${err}`
            });
        });
}

exports.create = (req, res, next) => {
    const league = new League({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        logo: req.file.path,
        isActive: req.body.isActive
    });

    league.save()
        .then(result => {
            res.status(201).json({
                message: "Created leagues successfully",
                createdLeagues: {
                    _id: result._id,
                    name: result.name,
                    logo: result.logo,
                    isActive: result.isActive,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/leagues/" + result._id
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
        isActive: req.body.isActive
    };
    League.update({ _id: id }, model)
        .then(result => {
            res.status(200).json({
                message: "Updated leagues successfully"
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
    League.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "League deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/leagues",
            body: { name: "String", logoImage: "String", isActive: "Boolean" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };

