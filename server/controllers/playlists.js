import express from 'express';
import mongoose from 'mongoose';
import Playlist from '../models/playlist.js';
import Track from '../models/track.js';


import stringSimilarity from 'string-similarity';

const router = express.Router()
const m = new mongoose.Mongoose();

//Getting all
export const getPlaylists = async (req, res) => {
    const {page} = req.query;

    try {

        const LIMIT = 10;
        const startIndex = (Number(page) -1 )* LIMIT; 
        const total = await Playlist.countDocuments({});
        const playlists = await Playlist.find().sort({last_edit: -1}).limit(LIMIT).skip(startIndex);

        res.status(200).json({data: playlists, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) })
    }catch (err) {
        res.status(500).json({message: err.message})
    }
}

//Getting mine only
export const getMyPlaylists = async (req, res) => {
    const {page} = req.query;
    console.log(page)
    if(page == 0){
        try {
            const playlists = await Playlist.find({creator: req.params.creator}).sort({last_edit: -1});
    
            res.status(200).json({data: playlists })
        }catch (err) {
            res.status(500).json({message: err.message})
        }

    } else {
        try {

            const LIMIT = 10;
            const startIndex = (Number(page) -1 )* LIMIT; 
            const total = await Playlist.countDocuments({});
            const playlists = await Playlist.find({creator: req.params.creator}).sort({last_edit: -1}).limit(LIMIT).skip(startIndex);
    
            res.status(200).json({data: playlists, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) })
        }catch (err) {
            res.status(500).json({message: err.message})
        }
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

    var allResults = await Playlist.find({}, {_id: 0, playlist_name: 1, description: 1})

    let allResultsStr = JSON.stringify(allResults).replace(/"playlist_name":|"description":/g, '');

    let allResultsArr = allResultsStr.split('},{');

    let softSearch = stringSimilarity.findBestMatch(req.params.playlistSearch, allResultsArr);

    let sortedSearch = softSearch.ratings.sort((t1, t2) => (t1.rating < t2.rating) ? 1 : (t1.rating > t2.rating) ? -1 : 0);
    
    console.log(sortedSearch)

    
    var finalResults = [];
    for(let i = 0; i < sortedSearch.length; i++){
        
        let searchIndex = allResultsArr.indexOf(sortedSearch[i].target)
        console.log(sortedSearch[i].target)
        console.log(searchIndex)
        console.log(allResultsArr[searchIndex])
        let playlist = await Playlist.findOne({playlist_name: allResults[searchIndex].playlist_name})
        finalResults.push(playlist);

    }
    console.log(finalResults)

    
    res.send(finalResults)
}


//Creating one
export const createPlaylist = async (req, res) => {

    let checkList;
    
    try {
        checkList = await Playlist.findOne({playlist_name: req.body.playlist_name})
        if (checkList !== null) {
            return res.status(400).json({ message: 'Playlist already exists' })
        }    
    } catch (err){
        res.status(400).json({ message: err.message })
    }


    const playlist = req.body;

    const newPlaylist = new Playlist ({ ... playlist, creator: req.userId, last_edit: new Date()})
    
    newPlaylist.playlist_name = req.body.playlist_name.trim()

    try {
        await newPlaylist.save()
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
    
    if(req.userId !== res.playlist.creator){
        return res.status(400).json({ message: "You are not the playlist creator." })

    }

    if (req.body.playlist_name != null){
        res.playlist.playlist_name = req.body.playlist_name;
    }
    if (req.body.description != null){
        res.playlist.description = req.body.description;
    } 
    if (req.body.remove_track != null){
        let track
        try {
            track = await Track.findOne({track_id: req.body.remove_track})
            if (track == null) {
                return res.status(404).json({ message: 'Cannot find track' })
            }
        } catch (err) {
            console.log("add track")
            return res.status(500).json({ message: err.message })
        }
        
        const index = res.playlist.track_list.indexOf(req.body.remove_track);
        if (index > -1) { 
            res.playlist.track_list.splice(index, 1); 
        }

    } 
    if (req.body.add_track != null){
        let track
        try {
            track = await Track.findOne({track_id: req.body.add_track})
            if (track == null) {
                return res.status(404).json({ message: 'Cannot find track' })
            }
        } catch (err) {
            console.log("add track")
            return res.status(500).json({ message: err.message })
        }
        if(res.playlist.track_list.includes(req.body.add_track)){
            return res.status(400).json({ message: 'Track is already in Playlist' })
        }
        res.playlist.track_list.push(req.body.add_track)

                
        let tempDuration = track.track_duration.split(':');
        let mins = parseInt(tempDuration[0])*60;
        let duration = mins + parseInt(tempDuration[1])

        let totalDuration = 0;
        tempDuration = res.playlist.playtime.split(':');
        mins = parseInt(tempDuration[0])*60;
        totalDuration = duration + mins + parseInt(tempDuration[1]); 
        
        let seconds = totalDuration % 60;

        let playtime = Math.floor(totalDuration / 60) + ":" + seconds.toLocaleString('en-US', {
            minimumIntegerDigits: 2})
        console.log(playtime)
        
        res.playlist.playtime = playtime;
    }

    res.playlist.last_edit = new Date();
    res.playlist.tracks_amount = res.playlist.track_list.length;

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
        res.status(500).json({ message: err.message})
    }
}

export const commentPlaylist = async (req, res) => {
    const { value } = req.body;

    const playlist = await Playlist.findOne({playlist_name: req.params.playlist_name})

    const d = new Date();
    let comment = d.toLocaleString().concat(" - " + value);
    playlist.comments.push(comment)
    
    const updatedPlaylist = await Playlist.findByIdAndUpdate(playlist._id, playlist, { new:true });


    res.json(updatedPlaylist);
}


export default router;