import React, {useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles'
import { commentPlaylist } from '../../actions/playlists';

const CommentSection = ({ playlist } ) => {
    const classes = useStyles();
    const [comments, setComments] = useState([playlist?.comments]);
    const [comment, setComment]= useState('');
    const dispatch = useDispatch();
    const commentsRef = useRef()

    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClick = async () => {
        console.log(playlist?.comments)
        const finalComment = `${user.result.name}: ${comment}`;
        console.log(finalComment)

        const newComments = await dispatch(commentPlaylist(finalComment, playlist.playlist_name));
        console.log(playlist?.comments)
        console.log(newComments)

        setComments(newComments);

        setComment('')

        commentsRef.current.scrollIntoView({ behavior: 'smooth'});
    };

    return(
        <div>
            <div className= {classes.commentsOuterContainer}>
                <div className= {classes.commentsInnerContainer}>
                    <Typography gutterBottom variant = "h6">Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key = {i} gutterBottom variant= "subtitle1">
                            {c}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name && (
                <div style = {{width: '500%'}}>
                    <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                    <TextField
                        fullWidth
                        minRows = {4}
                        variant = "outlined"
                        label= "Comment"
                        multiline
                        value={comment}
                        onChange= {(e) =>setComment(e.target.value)}
                    />
                    <Button style = {{marginTop: '10px'}} fullWidth disabled={!comment} variant = "contained" color='primary' onClick = {handleClick}>
                        Comment
                    </Button>

                </div>
                )}

            </div>

        </div>
    );
};

export default CommentSection;