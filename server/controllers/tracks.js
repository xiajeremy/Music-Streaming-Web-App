import express from 'express';
import mongoose from 'mongoose';
import Track from '../models/track.js';
import Playlist from '../models/playlist.js'
import stringSimilarity from 'string-similarity';

const router = express.Router()



export const getTracks = async (req, res) => {
    const {page} = req.query;
    try {

        const LIMIT = 20;
        const startIndex = (Number(page) -1 )* LIMIT; 
        const total = await Track.countDocuments({});
        const tracks = await Track.find().limit(LIMIT).skip(startIndex);

        res.status(200).json({data: tracks, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) })
    }catch (err) {
        res.status(500).json({message: err.message})
    }
}
export const getMyTracks = async (req, res) => {
    let playlist
    try { 
        playlist = await Playlist.findOne({playlist_name: req.params.playlist_name})
        if (playlist == null) {
            return res.status(404).json({ message: 'Cannot find playlist' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    let playlistTracks = [];
    for(let i = 0; i < playlist.track_list.length; i ++){
        let track
        try { 
            track = await Track.findOne({track_id: playlist.track_list[i]})
            if (track == null) {
                return res.status(404).json({ message: 'Cannot find track' + playlist.track_list[i]})
            }
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }

        playlistTracks.push(track)
    }
    console.log(playlistTracks)

    res.send({data: playlistTracks})
}

//Getting one
export const getTrack = async (req, res) => {
    let track
    try { 
        track = await Track.findOne({track_id: req.params.track_id})
        if (track == null) {
            return res.status(404).json({ message: 'Cannot find track' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    
    res.track = track

    res.send(res.track)
}

//QUESTION 4
export const searchTracks = async (req, res) => {

    var allResults = await Track.find({}, {_id:0, track_id: 1, track_title: 1, album_title: 1 })

    let allResultsStr = JSON.stringify(allResults).replace(/"track_id":(.*?)"album_title":|"track_title":/g, '');
    let allResultsArr = allResultsStr.split('},{');

    let softSearch = stringSimilarity.findBestMatch(req.params.trackSearch, allResultsArr);

    let sortedSearch = softSearch.ratings.sort((t1, t2) => (t1.rating < t2.rating) ? 1 : (t1.rating > t2.rating) ? -1 : 0);
    
    console.log(sortedSearch)

    
    var finalResults = [];
    let counter = 0;
    for(let i = 0; i < sortedSearch.length; i++){
        if(counter < 20){
            let searchIndex = allResultsArr.indexOf(sortedSearch[i].target)
            console.log(sortedSearch[i].target)
            console.log(searchIndex)
            console.log(allResultsArr[searchIndex])
            let track = await Track.findOne({track_id: allResults[searchIndex].track_id})
            finalResults.push(track);
            counter ++;
        } else {
            break;
        }
    }
    console.log(finalResults)

    res.send(finalResults)
}


//Updating one (use patch to update certain parts instead of replacing entire resource)
export const updateTrack = async (req, res) => {
    let track
    try { 
        track = await Track.findOne({track_id: req.params.track_id})
        if (track == null) {
            return res.status(404).json({ message: 'Cannot find track' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.track = track

    if (req.body.track_title != null) {
        res.track.track_title = req.body.track_title
    }
    try {
        const updatedTrack = await res.track.save()
        res.json(updatedTrack)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
}
//Deleting one
export const deleteTrack = async (req, res) => {
    let track
    try { 
        track = await Track.findOne({track_id: req.params.track_id})
        if (track == null) {
            return res.status(404).json({ message: 'Cannot find track' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.track = track
    
    try {
        await res.track.remove()
        res.json({ message: "Deleted track"})
    } catch (err) {
        res.status(500).jason({ message: err.message})
    }
}



export default router;