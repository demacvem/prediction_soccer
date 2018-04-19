'use strict'

const mongoose = require('mongoose');
const Journey = require('../models/journey');

exports.getAll = (req, res, next) => {
    Journey.find()
        .populate("tournament" ,"name")
        .exec()
        .then(results => {
            res.status(200).json({
                total: results.length,
                journeys: results
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
    Journey
        .findById(id)
        .populate("tournament" ,"name")
        .exec()
        .then(result => {
            if(!result){
                return res.status(404).json({ message: 'El registro no existe' });
            }

            res.status(200).json({
                journey: result
            });
        })
        .catch(err => {
            res.status(500).json({
                error: `Ha ocurrido un error: ${err}`
            });
        });
}

exports.create = (req, res, next) => {
    const date = new Journey({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        date: req.body.date,
        journey: req.body.tournament
    });

    date.save()
        .then(result => {
            res.status(201).json({
                message: "Created journey successfully",
                createdJourney: {
                    _id: result._id,
                    name: result.name,
                    tournament: result.tournament,
                    date: result.date,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/journeys/" + result._id
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
        tournament: req.body.tournament,
        date: req.body.date
    };
    Journey.update({ _id: id }, model)
        .then(result => {
            res.status(200).json({
                message: "Updated journey successfully"
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
    Journey.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: "Journey deleted",
          request: {
            type: "POST",
            url: "http://localhost:3000/journeys",
            body: { name: "String", tournament: "String", date: "Date" }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  };

