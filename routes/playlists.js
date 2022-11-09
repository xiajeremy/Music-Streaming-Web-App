const express = require('express')
const router = express.Router()
const Playlist = require('../models/playlist')


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
router.get('/:playlist_id', getPlaylist, (req, res) => {
    res.send(res.playlist)
})

//QUESTION 5
router.get('/search/:playlistSearch', async (req, res) => {
    var allResults = await Playlist.find({'playlist_name': {$regex: new RegExp(req.params.playlistSearch, 'i')}});
    
    var finalResults = [];
    for(let i = 0; i < allResults.length - 1; i++){
        finalResults.push(allResults[i].playlist_id);
    }
    res.send(finalResults)
})

//Creating one
/*router.post('/', async (req, res) => {
    const playlist = new Playlist ({
        playlist_id: req.body.playlist_id,
        playlist_name: req.body.playlist_name
    })
    try {
        const newPlaylist = await playlist.save()
        res.status(201).json(newPlaylist)
    } catch (err){
        res.status(400).json({ message: err.message })
    }title
})
*/
//Create/Replace List given name
router.put('/:playlist_name', async (req, res) => {
    const trackList = req.body;
    console.log ("List: ", trackList);

    let totalDuration = 0;
    let trackIDArr = [];
    for(let i = 0; i < req.body.length; i++){
        let tempDuration = req.body[i].track_duration.split(':');
        let mins = parseInt(tempDuration[0])*60;
        let duration = mins + parseInt(tempDuration[1])
        totalDuration += duration; 

        trackIDArr.push(req.body[i].track_id);
    }

    let playtime = Math.floor(totalDuration / 60) + ":" + totalDuration % 60

    playlist = await Playlist.find({playlist_name: req.params.playlist_id})
        if (playlist == null) {
            const playlist = new Playlist ({
                playlist_name: req.params.playlist_name,
                '#tracks': req.body.length,
                playtime: playtime,
                track_list: trackIDArr
            })
        }
    const playlist = res.playlist.find

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
        playlist = await Playlist.find({playlist_id: req.params.playlist_id})
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
