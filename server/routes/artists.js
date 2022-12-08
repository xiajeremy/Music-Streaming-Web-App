import express from 'express';
import { getArtists, getArtist, searchArtists, updateArtist, deleteArtist } from '../controllers/artists.js';
import csv from 'csvtojson';
import multer from 'multer';
import auth from '../middleware/auth.js';

let upload =  multer({dest: 'data/'})

const router = express.Router()


//Getting all
router.get('/', getArtists)
//Getting one
router.get('/:artist_id', getArtist)
//Getting Search
router.get('/search/:artistSearch', searchArtists);
//Updating one (use patch to update certain parts instead of replacing entire resource)
router.patch('/:artist_id', updateArtist);
//Deleting one
router.delete('/:artist_id', deleteArtist);
//Populate database
router.post('/', upload.single('file'),async (req, res)=>{
    csv()
    .fromFile('data/raw_artists.csv')
    .then(obj=>{
        try{
            obj.forEach(async item =>{
                const artist = new Artist({
                    artist_name: item.artist_name,
                    artist_id: item.artist_id,
                    artist_members: item.artist_members,
                    artist_location: item.artist_location,
                    artist_website: item.artist_website,
                    artist_tags: item.artist_tags
                });
                artist.save()
            })
            res.json({message:'Succesfully Uploaded'})
        }
        catch(err){
            err.status(400).json({message: err.message});
        }
    })
})


export default router;
