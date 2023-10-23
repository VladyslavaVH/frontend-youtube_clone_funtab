import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import GoogleAuth from '../Google/GoogleAuth';
import { reduxForm, Field } from 'redux-form';
import './Login.css';
import { loginAPI } from '../../../api/api';
import { Stack, Button, Box, Link, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ReactComponent as ShowPasswordIcon } from '../../../assets/show_password.svg';
import { ReactComponent as HidePasswordIcon } from '../../../assets/hide_password.svg';
import { login } from './../../../redux/auth-reducer';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StyledText = styled(Typography)(({ theme }) => ({
    fontSize: '15px',
    fontWeight: 400,
    color: theme.palette.grey.placeholder,
    margin: '7px 0'
}));

const SubmitButton = styled(Button)(({theme}) => ({
    padding: '10px 0', 
    fontSize: 22, 
    fontWeight: 700, 
    fontFamily: 'Roboto',
    background: theme.palette.primary.main,
    ':hover': {
        background: theme.palette.action.buttonHover
    }
}));

const MyField = styled(Field)(({ theme }) => ({
    fontFamily: 'Roboto',
    textDecoration: "none",
    background: theme.palette.grey.textField,
    border: '2px solid transparent',
    borderRadius: '3px',
    width: 'inherit',
    marginBottom: '13px',
    padding: '13px',
    fontSize: 18,
    '&::placeholder': {
        color: theme.palette.grey.placeholder

    },
    ':focus-visible': {
        outline: 'none',
        border: '2px solid',
        borderColor: theme.palette.primary.main,
    }
}));

const PasswordBox = styled(Box)(({theme}) => ({
    display: 'flex', 
    alignItems: 'center',
    background: theme.palette.grey.textField,
    border: '2px solid transparent',
    borderRadius: '3px',
    width: 'inherit',
    marginBottom: '13px',
    ':focus-within': {
        outline: 'none',
        border: '2px solid',
        borderColor: theme.palette.primary.main,
    }
}));

const passwordBtnStyle = {
    margin: '13px', 
    marginLeft: 0,
    cursor: 'pointer'
};

const LoginForm = (props) => {
    const [passwordType, setPasswordType] = useState('password');

    const togglePasswordType = () => {
        if (passwordType == 'password') {
            setPasswordType('text');
        } else {
            setPasswordType('password');
        }
    }

    return (
        <form onSubmit={props.handleSubmit} className="form">
            <Stack direction='column' style={{ width: 'inherit' }} >
                <MyField required component={'input'} size="small" variant='outlined' className='field' placeholder='Email' name='email' />
                <PasswordBox>
                    <MyField required style={{width: '95%', marginBottom: 0, border: 'none'}} type={passwordType} component={'input'} placeholder='Password' name='password' />
                    {(passwordType == 'password')
                    ?<HidePasswordIcon style={passwordBtnStyle} onClick={togglePasswordType} />
                    :<ShowPasswordIcon style={passwordBtnStyle} onClick={togglePasswordType} /> }
                </PasswordBox>  

                <SubmitButton variant="contained" type='submit' 
                disableTouchRipple disableRipple disableFocusRipple disableElevation>
                    Login
                </SubmitButton>

                <StyledText align='center' variant="caption" color="CaptionText">
                    Forgot your password?
                </StyledText>

                <GoogleAuth setAuthUserData={props.setAuthUserData}
                    toggleModalActive={props.toggleModalActive} />

                <StyledText sx={{margin: 0}} align='center' variant="caption" color="CaptionText">
                    Don't have an account yet?
                </StyledText>

                <Button size="small" style={{fontFamily: 'Roboto', fontWeight: 400, marginTop: '-5px', marginBottom: '20px', padding: 0, textTransform: 'none', color: 'primary.main'}}
                onClick={() => props.onClickSubmit(0)}
                disableTouchRipple disableRipple sx={{':hover': {background: 'transparent'}}}>
                    Create an account
                </Button>
            </Stack>
        </form>
    );
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {
    
    const onSubmit = (formData) => {
        props.login(formData['email'], formData['password']);        
    }

    useEffect(() => {
        if (props.isAuth) {
            props.handleClose();
        }
    }, props.isAuth);

    return (
        <div className="section">
            <Typography sx={{ fontWeight: 600, fontSize: 34, marginBottom: '10px'}}>Sign in</Typography>
            <LoginReduxForm onSubmit={onSubmit} onClickSubmit={props.onClickSubmit}
            setAuthUserData={props.setAuthUserData} />
        </div>
    );
}

let mapDispatchToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    };
}

export default connect(mapDispatchToProps, {
    login
})(Login);