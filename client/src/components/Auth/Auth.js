import React, { useState } from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container} from "@material-ui/core";
import {GoogleLogin} from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch } from 'react-redux'
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

import Icon from "./icon"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from "./styles"
import Input from "./Input"
import { signin, signup } from '../../actions/auth';

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: ""}

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignup){
            console.log("authcomponent")
            
            dispatch(signup(formData, history))
            
        } else {
            dispatch(signin(formData, history))

        }
    };
    const handleChange = (e) => {
        setFormData({ ... formData, [e.target.name]: e.target.value })
    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };


    const googleSuccess = async (res) => {
        console.log(res);
        const token = res?.credential;
        const result = jwt_decode(token);
        
        console.log(token)
        console.log(result)
        localStorage.setItem('profile', JSON.stringify({result, token}))

        history.push('/playlists')
        // try {
        //     dispatch({type: 'AUTH', data: {result, token}})
        // } catch (error) {
        //     console.log(error)
        // }
    };
    const googleFailure = (error) => {
        console.log(error)
        console.log("Google Sign In was unsuccessful.");
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Typography variant="h4">
                    {'Lab 4 Web App'}
                </Typography>
                <Typography variant="h6" align="center">
                    {'We are a music browsing web application. You can find tracks, artists, and public playlists! Sign in to create your first playlist!'}
                </Typography>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">
                    {isSignup ? 'Signup' : 'Sign In'}
                </Typography>
                <form className = {classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing ={2}>
                        {isSignup && (
                        <>
                            <Input name = "firstName" label="First Name" handleChange = {handleChange} autoFocus half />
                            <Input name = "lastName" label="Last Name" handleChange = {handleChange} half />
                        </>
                        )}
                        <Input name = "email" label="Email Address" handleChange = {handleChange} type="email" />
                        <Input name = "password" label="Password" handleChange = {handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange = {handleChange} type="password" />}
                    </Grid>
                    <GoogleOAuthProvider clientId="86240478934-6apalc2cm8k2stnm6ikd1hc5qsv12o9b.apps.googleusercontent.com">
                        <GoogleLogin 
                            render={(renderProps) => (
                                <Button 
                                    className={classes.googleButton} 
                                    color="primary" 
                                    fullWidth
                                    onClick={renderProps.onClick} 
                                    disabled={renderProps.disabled}
                                    startIcon={<Icon />}
                                    variant="contained"
                                >
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />
                    </GoogleOAuthProvider>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container content="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth