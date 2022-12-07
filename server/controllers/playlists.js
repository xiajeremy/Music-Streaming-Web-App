import express from 'express';
import mongoose from 'mongoose';
import Playlist from '../models/playlist.js';
import Track from '../models/track.js';


import stringSimilarity from 'string-similarity';
import playlist from '../models/playlist.js';

const router = express.Router()

//Getting all
export const getPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find()
        res.json(playlists)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
}

//Getting one
export const getPlaylist = async (req, res) => {
    let playlist
    try { 
        playlist = await Playlist.findOne({playlist_name: req.params.playlist_name})
        if (playlist == null) {
            return res.status(404).json({ message: 'Cannot find playlist' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.playlist = playlist;

    res.send(res.playlist)
}

//Search function
export const searchPlaylists = async (req, res) => {

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
}


//Creating one
export const createPlaylist = async (req, res) => {

    if(!req.userId) return res.json({message: "Unauthenticated"})
    let checkList;
    
    try {
        checkList = await Playlist.findOne({playlist_name: req.body.playlist_name})
        if (checkList !== null) {
            return res.status(400).json({ message: 'Playlist already exists' })
        }    
    } catch (err){
        res.status(400).json({ message: err.message })
    }



    const playlist = new Playlist ({
        playlist_name: req.body.playlist_name,
        description: req.body.description,
        creator: req.body.creator,
        last_edit: new Date().toLocaleString()
    })
    
    try {
        const newPlaylist = await playlist.save()
        res.status(201).json(newPlaylist)
    } catch (err){
        res.status(400).json({ message: err.message })
    }
    
}


//Replace List given name
export const updatePlaylist = async (req, res) => {
    let playlist;
    
    try {
        playlist = await Playlist.findOne({playlist_name: req.params.playlist_name})
        if (playlist == null) {
            return res.status(404).json({ message: 'Cannot find playlist' })
        }    
    } catch (err){
        res.status(400).json({ message: err.message })
    }
    res.playlist = playlist;
    
    if (req.body.creator != null){
        res.playlist.creator = req.body.creator;
    }
    if (req.body.playlist_name != null){
        res.playlist.playlist_name = req.body.playlist_name;
    }
    if (req.body.description != null){
        res.playlist.description = req.body.description;
    } 
    if (req.body.add_track != null){
        let track
        try {
            track = Track.findOne({track_id: req.body.add_track})
            if (currentTrack == null) {
                return res.status(404).json({ message: 'Cannot find track' })
            }
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
        res.playlist.trackList.push(track)
        
        
        
        let tempDuration = track.track_duration.split(':');
        let mins = parseInt(tempDuration[0])*60;
        let duration = mins + parseInt(tempDuration[1])

        let totalDuration = 0;
        tempDuration = res.playlist.playtime.split(':');
        mins = parseInt(tempDuration[0])*60;
        totalDuration = duration + mins + parseInt(tempDuration[1]); 
        
        let playtime = Math.floor(totalDuration / 60) + ":" + totalDuration % 60

        res.playlist.playtime = playtime;
    }

    res.playlist.last_edit = new Date().toLocaleString();

    try {
        const updatedPlaylist = await res.playlist.save()
        res.status(201).json(updatedPlaylist)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
}



//Deleting one
export const deletePlaylist = async (req, res) => {
    let playlist
    try { 
        playlist = await Playlist.findOne({playlist_name: req.params.playlist_name})
        if (playlist == null) {
            return res.status(404).json({ message: 'Cannot find playlist' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.playlist = playlist;
    try {
        await res.playlist.remove()
        res.json({ message: "Deleted playlist"})
    } catch (err) {
        res.status(500).jason({ message: err.message})
    }
}



export default router;