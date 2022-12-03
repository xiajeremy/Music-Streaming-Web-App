const express = require('express')
const router = express.Router()
const Playlist = require('../models/playlist')
const Track = require('../models/track')
const { param, validationResult } = require('express-validator');
var stringSimilarity = require("string-similarity");


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
    res.send(res.playlist)
})

//Search function
router.get('/search/:playlistSearch', async (req, res) => {

    var allResults = await Playlist.find({}, {playlist_name: 1, description: 1})

    allResultsStr = JSON.stringify(allResults);
    allResultsArr = allResultsStr.split('},{');

    softSearch = stringSimilarity.findBestMatch(req.params.playlistSearch, allResultsArr);

    let sortedSearch = softSearch.ratings.sort((t1, t2) => (t1.rating < t2.rating) ? 1 : (t1.rating > t2.rating) ? -1 : 0);
    
    console.log(sortedSearch)

    
    var finalResults = [];
    for(let i = 0; i < sortedSearch.length; i++){
        
        let searchIndex = allResultsArr.indexOf(sortedSearch[i].target)
        console.log(sortedSearch[i].target)
        console.log(searchIndex)
        console.log(allResultsArr[searchIndex])
        finalResults.push(allResults[searchIndex].playlist_name);

    }
    console.log(finalResults)

    
    res.send(finalResults)
})


//Creating one
router.post('/:playlist_name', param('playlist_name').isLength({ max: 20 }).escape(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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


//Replace List given name
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
    
    


    const trackList = req.body.track_list;

    let totalDuration = 0;
    
    for(let i = 0; i < trackList.length; i++){
        let currentTrack
        try { 
            currentTrack = await Track.findOne({track_id: trackList[i]})
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

    

    playlist.tracks_amount = trackList.length;
    playlist.playtime = playtime;
    playlist.track_list = trackList;
    playlist.last_edit = new Date().toLocaleString();

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
        playlist = await Playlist.findOne({playlist_name: req.params.playlist_name})
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
