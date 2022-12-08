import React, {useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import useStyles from './styles'

const CommentSection = ({ playlist } ) => {
    console.log(playlist);

    return(
        <h1>Comment Section</h1>
    );
};

export default CommentSection;