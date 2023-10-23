import React, { useEffect, useState, createRef } from "react";
import { connect } from "react-redux";
import GoogleAuth from "../Google/GoogleAuth";
import { reduxForm, Field } from 'redux-form';
import { Stack, Box, Button, Link, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { registerAPI } from './../../../api/api';
import { ReactComponent as ShowPasswordIcon } from '../../../assets/show_password.svg';
import { ReactComponent as HidePasswordIcon } from '../../../assets/hide_password.svg';
import '../Login/Login.css';
import { registration } from "../../../redux/auth-reducer";

const StyledText = styled(Typography)(({ theme }) => ({
    fontSize: '18px',
    fontWeight: 400,
    color: theme.palette.grey.placeholder,
    margin: '7px 0'
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

const PasswordBox = styled(Box)(({ theme }) => ({
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

const SubmitButton = styled(Button)(({ theme }) => ({
    padding: '10px 0',
    fontSize: 22,
    fontWeight: 700,
    fontFamily: 'Roboto',
    background: theme.palette.primary.main,
    ':hover': {
        background: theme.palette.action.buttonHover
    }
}));

const passwordBtnStyle = {
    margin: '13px',
    marginLeft: 0,
    cursor: 'pointer'
};

let RegistrationForm = (props) => {
    const [passwordType, setPasswordType] = useState('password');
    const [confirmPasswordType, setConfirmPasswordType] = useState('password');

    const togglePasswordType = () => {
        if (passwordType == 'password') {
            setPasswordType('text');
        } else {
            setPasswordType('password');
        }
    }

    const toggleConfirmPasswordType = () => {
        if (confirmPasswordType == 'password') {
            setConfirmPasswordType('text');
        } else {
            setConfirmPasswordType('password');
        }
    }

    return (
        <form onSubmit={props.handleSubmit} className="form">
            <Stack direction='column' style={{ width: 'inherit', }} >
                <MyField component={'input'} pattern={`^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$`} required placeholder='Email' name='email' />
                <MyField component={'input'} pattern={`^[0-9A-Za-z-_\.]{8,20}$`} required placeholder='Create user name' name='userName' />

                <PasswordBox>
                    <MyField style={{ width: '95%', marginBottom: 0, border: 'none' }}
                    pattern={'^[0-9A-Za-z-_\.`~!@#$%^&*()+=\?]{8,20}$'} required type={passwordType} component={'input'} placeholder='Password' name='password' />
                    {(passwordType == 'password')
                        ? <HidePasswordIcon style={passwordBtnStyle} onClick={togglePasswordType} />
                        : <ShowPasswordIcon style={passwordBtnStyle} onClick={togglePasswordType} />}
                </PasswordBox>

                <PasswordBox>
                    <MyField style={{ width: '95%', marginBottom: 0, border: 'none' }} 
                    pattern={'^[0-9A-Za-z-_\.`~!@#$%^&*()+=\?]{8,20}$'} required type={confirmPasswordType} component={'input'} placeholder='Confirm password' name='confirmPassword' />
                    {(confirmPasswordType == 'password')
                        ? <HidePasswordIcon style={passwordBtnStyle} onClick={toggleConfirmPasswordType} />
                        : <ShowPasswordIcon style={passwordBtnStyle} onClick={toggleConfirmPasswordType} />}
                </PasswordBox>

                <SubmitButton variant="contained" type='submit' disableTouchRipple disableRipple disableFocusRipple disableElevation>
                    <Typography>Create an account</Typography>
                </SubmitButton>
                <StyledText align='center' variant="caption" color="CaptionText">
                    or
                </StyledText>

                <GoogleAuth setAuthUserData={props.setAuthUserData} />

                <Stack direction='row' alignItems='center' justifyContent='center'>
                    <StyledText>Already have an account?</StyledText>
                    <Button size="small" style={{ fontFamily: 'Roboto', textTransform: 'none', color: 'primary.main' }}
                        onClick={() => props.onClickSubmit(3)}
                        disableTouchRipple disableRipple sx={{ ':hover': { background: 'transparent' } }}>
                        Sign in
                    </Button>
                </Stack>
            </Stack>
        </form>
    );
}

const RegistrationReduxForm = reduxForm({ form: 'registration' })(RegistrationForm);

const Registration = (props) => {
    const onSubmit = (formData) => {
        props.registration(formData);
        document.cookie = `email=${formData.email}`;
    }
    
    useEffect(() => {
        if (props.validRegData) {
            props.onClickSubmit(1);            
        }
    }, [props.validRegData]);

    return (
        <div className="section">
            <Typography sx={{ fontWeight: 600, fontSize: 34, marginBottom: '10px' }}>Registration</Typography>
            <RegistrationReduxForm onSubmit={onSubmit} onClickSubmit={props.onClickSubmit}
            setAuthUserData={props.setAuthUserData} />
        </div>
    );
}

let mapStateToProps = (state) => {
    return {
        validRegData: state.auth.validRegData
    }
};

export default connect(mapStateToProps, {
    registration
})(Registration);