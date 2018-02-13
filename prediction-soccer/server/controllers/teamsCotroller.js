'use strict'

const mongoose = require('mongoose');
const Team = require('../models/team');

exports.getAll = (req, res, next) => {
    Team.find()
        .select("_id name initials league")
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

exports.getById = (req, res, next) => {
    let id = req.params.id;
    Team
        .findById(id)
        .populate("league", "name")
        .exec()
        .then(result => {
            if(!result){
                return res.status(404).json({ message: 'El registro no existe' });
            }

            res.status(200).json({
                team: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Ha ocurrido un error: ${err}`
            });
        });
}

exports.create = (req, res, next) => {
    const team = new Team({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        logo: req.file.path,
        initials: req.body.initials,
        league: req.body.league
    });

    team.save()
        .then(result => {
            res.status(201).json({
                message: "Created teams successfully",
                createdLeagues: {
                    _id: result._id,
                    name: result.name,
                    logo: result.logo,
                    initials: result.initials,
                    league: result.league,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/teams/" + result._id
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
        initials: req.body.initials,
        league: req.body.league
    };
    Team.update({ _id: id }, model)
        .then(result => {
            res.status(200).json({
                message: "Updated teams successfully"
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
    Team.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Team deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/teams",
            body: { name: "String", logoImage: "String", initials: "String", league: "String" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };

