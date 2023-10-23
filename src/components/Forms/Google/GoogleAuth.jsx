import React from "react";
import GoogleLogin from 'react-google-login';
import { ReactComponent as GoogleLogo } from '../../../assets/google-logo.svg';
import { Button, Typography } from "@mui/material";

const GoogleAuth = (props) => {
    const responseGoogle = (res) => {
        console.log(res);
        console.log(res.profileObj);

        let email = res.profileObj.email;
        let lastName = res.profileObj.familyName;
        let firstName = res.profileObj.givenName;
        let googleId = res.profileObj.googleId;
        let imageUrl = res.profileObj.imageUrl;
        let fullName = res.profileObj.name;

        localStorage.setItem('email', email);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('googleId', googleId);
        localStorage.setItem('imageUrl', imageUrl);
        localStorage.setItem('fullName', fullName);
        
        props.setAuthUserData(email, fullName, null, lastName, firstName, googleId, imageUrl);
        //props.toggleModalActive(false);
    }

    return <GoogleLogin
    clientId='882812471086-a8lmtff8r55irjrv143bov0285spviiu.apps.googleusercontent.com'
    //clientId='882812471086-a33f1s2c0hl77j8ib347p9dvtif59cou.apps.googleusercontent.com'
    //buttonText='Sign in with Google'
    render={renderProps => (
        <Button disableTouchRipple disableRipple onClick={renderProps.onClick} style={{padding: '8px', textTransform: 'none', background: '#E9ECF1', border: 'none', marginBottom: '10px'}}>
            <GoogleLogo />
            <Typography style={{paddingLeft: '15px', fontFamily: 'Roboto', fontWeight: 400, fontSize: 18, color: '#0000008A'}}>
                Sign in with Google
            </Typography>
        </Button>
      )}
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'} />;
}

export default GoogleAuth;