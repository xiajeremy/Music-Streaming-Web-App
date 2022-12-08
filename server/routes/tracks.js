import express from 'express';
import { getTracks, getTrack, searchTracks, updateTrack, deleteTrack } from '../controllers/tracks.js';
import csv from 'csvtojson';
import multer from 'multer';
import auth from '../middleware/auth.js';
let upload =  multer({dest: 'data/'})

const router = express.Router()


//Getting all
router.get('/', getTracks);
//Getting one
router.get('/:track_id', getTrack);
//Getting Search
router.get('/search/:trackSearch', searchTracks);
//Updating one (use patch to update certain parts instead of replacing entire resource)
router.patch('/:track_id', updateTrack);
//Deleting one
router.delete('/:track_id', deleteTrack);
//Populate database
router.post('/', upload.single('file'),async (req, res)=>{
    csv()
    .fromFile('data/raw_tracks.csv')
    .then(obj=>{
        try{
            obj.forEach(async item =>{
                const track = new Track({
                    title: item.title,
                    track_id: item.track_id,
                    album_id: item.album_id, 
                    album_title: item.album_title,
                    artist_id: item.artist_id,
                    artist_name: item.artist_name,
                    tags: item.tags,
                    track_date_created: item.track_date_created,
                    track_date_recorded: item.track_date_recorded,
                    track_duration: item.track_duration,
                    track_genres: item.track_genres,
                    track_number: item.track_number,
                    track_title: item.track_title
                });
                track.save()
            })
            res.json({message:'Succesfully Uploaded'})
        }
        catch(err){
            err.status(400).json({message: err.message});
        }
    })
})

export default router;
