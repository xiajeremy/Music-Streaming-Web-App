import React, { useState } from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container} from "@material-ui/core";
import {GoogleLogin} from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {useDispatch} from 'react-redux'
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

import Icon from "./icon"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from "./styles"
import Input from "./Input"

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);


const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const history = useHistory();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleSubmit = () => {

    };
    const handleChange = () => {

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

        history.push('/')
        // try {
        //     
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