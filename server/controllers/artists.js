import express from 'express';
import mongoose from 'mongoose';
import Artist from '../models/artist.js';

import stringSimilarity from 'string-similarity';

const router = express.Router()



/*/Getting all
export const getArtists = async (req, res) => {
    try {
        const artists = await Artist.find()
        res.json(artists)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
}*/

export const getArtists = async (req, res) => {
    const {page} = req.query;
    try {

        const LIMIT = 25;
        const startIndex = (Number(page) -1 )* LIMIT; 
        const total = await Artist.countDocuments({});
        const artists = await Artist.find().sort({last_edit: -1}).limit(LIMIT).skip(startIndex);

        res.status(200).json({data: artists, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) })
    }catch (err) {
        res.status(500).json({message: err.message})
    }
}

//Getting one
export const getArtist = async (req, res) => {
    let artist
    try { 
        artist = await Artist.findOne({artist_id: req.params.artist_id})
        if (artist == null) {
            return res.status(404).json({ message: 'Cannot find artist' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.artist = artist

    res.send(res.artist)
}

//QUESTION 5
export const searchArtists = async (req, res) => {
    var allResults = await Artist.find({}, {_id: 0, artist_name: 1, artist_id: 1})

    let allResultsStr = JSON.stringify(allResults).replace(/"artist_id":(.*?)"artist_name":/g, '');
    let allResultsArr = allResultsStr.split('},{');

    let softSearch = stringSimilarity.findBestMatch(req.params.artistSearch, allResultsArr);

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
            let artist = await Artist.findOne({artist_id: allResults[searchIndex]})
            finalResults.push(artist);
            counter++;
        } else {
            break;
        }
    }
    console.log(finalResults)

    
    res.send(finalResults)

}




//Updating one (use patch to update certain parts instead of replacing entire resource)
export const updateArtist = async (req, res) => {
    let artist
    try { 
        artist = await Artist.findOne({artist_id: req.params.artist_id})
        if (artist == null) {
            return res.status(404).json({ message: 'Cannot find artist' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.artist = artist

    if (req.body.artist_name != null) {
        res.artist.artist_name = req.body.artist_name
    }
    try {
        const updatedArtist = await res.artist.save()
        res.json(updatedArtist)
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
}
//Deleting one
export const deleteArtist = async (req, res) => {
    let artist
    try { 
        artist = await Artist.findOne({artist_id: req.params.artist_id})
        if (artist == null) {
            return res.status(404).json({ message: 'Cannot find artist' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.artist = artist

    try {
        await res.artist.remove()
        res.json({ message: "Deleted artist"})
    } catch (err) {
        res.status(500).jason({ message: err.message})
    }
}


export default router;