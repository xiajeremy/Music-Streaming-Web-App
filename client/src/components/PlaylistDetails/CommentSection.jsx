import React, {useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles'
import { commentPlaylist } from '../../actions/playlists';

const CommentSection = ({ playlist } ) => {
    const classes = useStyles();
    const [comments, setComments] = useState([1,2,3,4]);
    const [comment, setComment]= useState('');
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClick = () => {
        const finalComment = `${user.result.name}: ${comment}`;
        dispatch(commentPlaylist(finalComment, playlist.id));
    };

    return(
        <div>
            <div className= {classes.commentsOuterContainer}>
                <div className= {classes.commentInnerContainer}>
                    <Typography gutterBottom variant = "h6">Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography gutterBottom variant= "subtitle1">
                            Comment {i}
                        </Typography>
                    ))}

                </div>
                {user?.result?.name && (
                <div style = {{width: '70%'}}>
                    <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                    <TextField
                    fullWidth
                    rows = {4}
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