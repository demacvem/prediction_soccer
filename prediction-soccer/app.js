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
const rolesRoutes = require('./server/routes/roles');
const permissionsTypeRoutes = require('./server/routes/permissionstype');
const permissionsRoutes = require('./server/routes/permissions');
const tournamentgroupsRoutes = require('./server/routes/tournamentgroups');
const tournamentTeamsRoutes = require('./server/routes/tournamentteams');
const matchesRoutes = require('./server/routes/matches');

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
app.use('/api/users', userRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/leagues', leaguesRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/tournaments', tournamentsRoutes);
app.use('/api/tournamentgroups', tournamentgroupsRoutes);
app.use('/api/dates', datesRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/permissionstype', permissionsTypeRoutes);
app.use('/api/permissions', permissionsRoutes);
app.use('/api/tournamentteams', tournamentTeamsRoutes);
app.use('/api/matches', matchesRoutes);

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