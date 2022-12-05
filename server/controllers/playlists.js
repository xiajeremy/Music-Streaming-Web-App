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
    try { 
        const playlist = await Playlist.findOne({playlist_name: req.params.playlist_name})
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
    
    

    const newName = req.body.playlist_name;
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

    
    playlist.playlist_name = newName;
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
}



//Deleting one
export const deletePlaylist = async (req, res) => {
    try { 
        const playlist = await Playlist.findOne({playlist_name: req.params.playlist_name})
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