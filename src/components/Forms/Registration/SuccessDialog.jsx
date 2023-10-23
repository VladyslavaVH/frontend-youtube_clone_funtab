import React, {useState, useEffect} from "react";
import { registerAPI } from '../../../api/api';
import { ReactComponent as CheckIcon } from '../../../assets/check_icon.svg';
import { Stack, Box, Button, Link, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

const SubmitButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    padding: '5px 20px',
    margin: '25px 0',
    width: 'max-content',
    fontSize: 18,
    fontWeight: 400,
    fontFamily: 'Roboto',
    background: theme.palette.primary.main,
    ':hover': {
        background: theme.palette.action.buttonHover
    }
}));

const SuccessDialog = (props) => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate('/');
        props.handleClose();
    }

    useEffect(() => {
        // let email = res.profileObj.email;
        // let icon = res.profileObj.icon;
        // let fullName = res.profileObj.name;

        // localStorage.setItem('email', email);
        // localStorage.setItem('icon', icon);
        // localStorage.setItem('fullName', fullName);
        
        // props.setAuthUserData(email, fullName, icon, null, null, null, null);
        //registerAPI
    }, []);

    return <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <CheckIcon style={{marginTop: '34px'}} />
        <Typography sx={{ fontSize: '24px', fontWeight: 500, textAlign: 'center' }}>Verified!</Typography>
        <Typography sx={{ fontSize: 18, fontWeight: 400, color: 'grey.placeholder', textAlign: 'center' }}>You have succesfully verified the account.</Typography>
                
        <SubmitButton 
        onClick={onClick}
            variant="contained" type='submit' 
            disableTouchRipple disableRipple disableFocusRipple disableElevation>
            Go to main page
        </SubmitButton>
    </Box>
}

export default SuccessDialog;