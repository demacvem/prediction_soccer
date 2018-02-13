'use strict'

const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

const userRoutes = require('./server/routes/users');
const statusRoutes = require('./server/routes/status');
const leaguesRoutes = require('./server/routes/leagues');
const teamsRoutes = require('./server/routes/teams');
const tournamentsRoutes = require('./server/routes/tournaments');
const datesRoutes = require('./server/routes/dates');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': false}));
app.use(express.static(path.join(__dirname, 'dist')));

// enable cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    next();
});

// Routes app
app.use('/users', userRoutes);
app.use('/status', statusRoutes);
app.use('/leagues', leaguesRoutes);
app.use('/teams', teamsRoutes);
app.use('/tournaments', tournamentsRoutes);
app.use('/dates', datesRoutes);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    .json({
      error: {
        message: error.message
      }
    });
});

module.exports = app;