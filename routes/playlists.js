const express = require('express')
const router = express.Router()
const Playlist = require('../models/playlist')
const Track = require('../models/track')


//Getting all
router.get('/', async (req, res) => {
    try {
        const playlists = await Playlist.find()
        res.json(playlists)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})
//Getting one
router.get('/:playlist_name', getPlaylist, (req, res) => {
    res.send(res.playlist.track_list)
})

//Creating one
router.post('/:playlist_name', async (req, res) => {
    let checkList;
    
    try {
        checkList = await Playlist.findOne({playlist_name: req.params.playlist_name})
        if (checkList !== null) {
            return res.status(400).json({ message: 'Playlist already exists' })
        }    
    } catch (err){
        res.status(400).json({ message: err.message })
    }


    const playlist = new Playlist ({
        playlist_name: req.params.playlist_name
    })
    
    try {
        const newPlaylist = await playlist.save()
        res.status(201).json(newPlaylist)
    } catch (err){
        res.status(400).json({ message: err.message })
    }
})

//Create/Replace List given name
router.put('/:playlist_name', async (req, res) => {
    let playlist;
    
    try {
        playlist = await Playlist.findOne({playlist_name: req.params.playlist_name})
        if (playlist == null) {
            return res.status(404).json({ message: 'Cannot find playlist' })
        }    
    } catch (err){
        res.status(400).json({ message: err.message })
    }


    const trackList = req.body;

    let totalDuration = 0;
    
    for(let i = 0; i < req.body.length; i++){
        let currentTrack
        try { 
            currentTrack = await Track.findOne({track_id: req.body[i]})
            if (currentTrack == null) {
                return res.status(404).json({ message: 'Cannot find track' })
            }
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
        console.log(currentTrack);

        let tempDuration = currentTrack.track_duration.split(':');
        let mins = parseInt(tempDuration[0])*60;
        let duration = mins + parseInt(tempDuration[1])
        totalDuration += duration; 

    }


    let playtime = Math.floor(totalDuration / 60) + ":" + totalDuration % 60

    

    playlist.tracks_amount = req.body.length;
    playlist.playtime = playtime;
    playlist.track_list = trackList;

    try {
        const updatedPlaylist = await playlist.save()
        res.status(201).json(updatedPlaylist)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }

    
})
//Deleting one
router.delete('/:playlist_name', getPlaylist, async (req, res) => {
    try {
        await res.playlist.remove()
        res.json({ message: "Deleted playlist"})
    } catch (err) {
        res.status(500).jason({ message: err.message})
    }
})

async function getPlaylist(req, res, next) {
    let playlist
    try { 
        playlist = await Playlist.findOne({playlist_id: req.params.playlist_id})
        if (playlist == null) {
            return res.status(404).json({ message: 'Cannot find playlist' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.playlist = playlist
    next()
}

module.exports = router
