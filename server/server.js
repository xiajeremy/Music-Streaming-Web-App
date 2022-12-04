import mongoose from 'mongoose';
import express from 'express';

//const mongoose = require('mongoose');
//const express = require('express');
const app = express();



const CONNECTION_URL = "mongodb+srv://ec2-user:Welcome2JX@cluster0.7h7yqij.mongodb.net/lab3";
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(3000, () => console.log('Server Started')))
    .catch((error) => console.log(error.message));


const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json())

import artistsRouter from './routes/artists.js';
//const artistsRouter = require('./routes/artists')
app.use('/artists', artistsRouter)

import albumsRouter from './routes/albums.js';
//const albumsRouter = require('./routes/albums')
app.use('/albums', albumsRouter)

import genresRouter from './routes/genres.js';
//const genresRouter = require('./routes/genres')
app.use('/genres', genresRouter)

import tracksRouter from './routes/tracks.js';
//const tracksRouter = require('./routes/tracks')
app.use('/tracks', tracksRouter)

import playlistRouter from './routes/playlists.js';
//const playlistRouter = require('./routes/playlists')
app.use('/playlists', playlistRouter)

app.use('/', express.static('../static'));


