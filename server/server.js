import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());

app.use(express.json())

import artistsRouter from './routes/artists.js';
app.use('/artists', artistsRouter)

import albumsRouter from './routes/albums.js';
app.use('/albums', albumsRouter)

import genresRouter from './routes/genres.js';
app.use('/genres', genresRouter)

import tracksRouter from './routes/tracks.js';
app.use('/tracks', tracksRouter)

import playlistRouter from './routes/playlists.js';
app.use('/playlists', playlistRouter)

const CONNECTION_URL = "mongodb+srv://ec2-user:Welcome2JX@cluster0.7h7yqij.mongodb.net/lab3";
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(3000, () => console.log('Server Started')))
    .catch((error) => console.log(error.message));


const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
