require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json())

const artistsRouter = require('./routes/artists')
app.use('/artists', artistsRouter)
const albumsRouter = require('./routes/albums')
app.use('/albums', albumsRouter)
const genresRouter = require('./routes/genres')
app.use('/genres', genresRouter)
const tracksRouter = require('./routes/tracks')
app.use('/tracks', tracksRouter)
const playlistRouter = require('./routes/playlists')
app.use('/playlists', playlistRouter)

app.use('/', express.static('static'));

app.listen(3000, () => console.log('Server Started'));

