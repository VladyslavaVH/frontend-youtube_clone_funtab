import React, { useEffect, useState, createRef } from "react";
import { reduxForm, Field } from 'redux-form';
import { registerAPI } from '../../../api/api';
import { ReactComponent as WarningIcon } from '../../../assets/warning_icon.svg';
import { Stack, Box, Button, Link, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import '../Login/Login.css';
import { connect } from "react-redux";
import { verifyCode, resendCode } from '../../../redux/auth-reducer';

const StyledText = styled(Typography)(({ theme }) => ({
    fontSize: '14px',
    fontWeight: 400,
    color: theme.palette.grey.placeholder,
    margin: '7px 0'
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    padding: '5px 20px',
    margin: '15px 0',
    fontSize: 18,
    fontWeight: 400,
    fontFamily: 'Roboto',
    background: theme.palette.primary.main,
    ':hover': {
        background: theme.palette.action.buttonHover
    }
}));

const ResendButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    padding: '5px 20px',
    margin: '12px 0',
    fontSize: 18,
    fontWeight: 400,
    fontFamily: 'Roboto',
    background: theme.palette.warning.main,
    ':hover': {
        background: theme.palette.warning.hover
    }
}));

const CodeField = styled(Field)(({ theme }) => ({
    maxWidth: '45px',
    maxHeight: '45px',
    width: '45px',
    height: '45px',
    border: '1px solid transparent',
    borderRadius: '3px',
    background: theme.palette.grey.textField,
    fontSize: 24,
    fontWeight: 500,
    textAlign: 'center',
    ':focus-visible': {
        outline: 'none',
        '::placeholder': {
            color: 'transparent'
        }
    },
    '::placeholder': {
        fontSize: 24,
        fontWeight: 500,
        color: 'black'
    },
    // ':empty': {
    //     borderColor: 'transparent'
    // },
    // ':invalid': {
    //     borderColor: theme.palette.warning.main
    // }
}));

let CodeForm = (props) => {
    const getCookieEmail = () => {
        return document.cookie.replace(/(?:(?:^|.*;\s*)email\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }
    return (
        <form onSubmit={props.handleSubmit} className="form">
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: '470px', width: '100%', }}>
                    <CodeField sx={{ borderColor: props.wrongCode ? 'warning.main' : 'transparent'}} pattern="^[0-9]{1}$" required maxLength="1" placeholder="_" name="code1" component={'input'} />
                    <CodeField sx={{ borderColor: props.wrongCode ? 'warning.main' : 'transparent'}} pattern="^[0-9]{1}$" required maxLength="1" placeholder="_" name="code2" component={'input'} />
                    <CodeField sx={{ borderColor: props.wrongCode ? 'warning.main' : 'transparent'}} pattern="^[0-9]{1}$" required maxLength="1" placeholder="_" name="code3" component={'input'} />
                    <CodeField sx={{ borderColor: props.wrongCode ? 'warning.main' : 'transparent'}} pattern="^[0-9]{1}$" required maxLength="1" placeholder="_" name="code4" component={'input'} />
                    <CodeField sx={{ borderColor: props.wrongCode ? 'warning.main' : 'transparent'}} pattern="^[0-9]{1}$" required maxLength="1" placeholder="_" name="code5" component={'input'} />
                    <CodeField sx={{ borderColor: props.wrongCode ? 'warning.main' : 'transparent'}} pattern="^[0-9]{1}$" required maxLength="1" placeholder="_" name="code6" component={'input'} />
                    <CodeField sx={{ borderColor: props.wrongCode ? 'warning.main' : 'transparent'}} pattern="^[0-9]{1}$" required maxLength="1" placeholder="_" name="code7" component={'input'} />
                    <CodeField sx={{ borderColor: props.wrongCode ? 'warning.main' : 'transparent'}} pattern="^[0-9]{1}$" required maxLength="1" placeholder="_" name="code8" component={'input'} />
                </Box>

                {!props.wrongCode
                    ? <>
                        <Stack sx={{ mt: '10px', }} direction='row' alignItems='center' justifyContent='center'>
                            <StyledText>Didn’t get a code?</StyledText>
                            <Button size="small" sx={{ fontSize: 14, fontFamily: 'Roboto', textTransform: 'none', color: 'primary.main', ':hover': { background: 'transparent' } }}
                                onClick={() => props.resendCode('yes', getCookieEmail())}
                                disableTouchRipple disableRipple>
                                Click to resend.
                            </Button>
                        </Stack>

                        <SubmitButton 
                        // onClick={checkCode}
                            variant="contained" type='submit' 
                            disableTouchRipple disableRipple disableFocusRipple disableElevation>
                            Confirm
                        </SubmitButton>
                    </>

                    : <>
                        <ResendButton variant="contained" type='submit'
                            disableTouchRipple disableRipple disableFocusRipple disableElevation>
                            Resend
                        </ResendButton>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <WarningIcon />
                            <StyledText sx={{ color: 'warning.main', fontSize: '14px' }}>
                                Wrong code
                            </StyledText>
                        </Box>
                    </>}
            </Box>
        </form>
    );
}

const CodeReduxForm = reduxForm({ form: 'codeForm' })(CodeForm);

const CodeDialog = (props) => {
    const [email, setEmail] = useState(null);
    const [responseCode, setResponseCode] = useState(null);

    const getCookieEmail = () => {
        let ce = document.cookie.replace(/(?:(?:^|.*;\s*)email\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        setEmail(ce);
    }

    useEffect(() => {
        getCookieEmail();
    });

    const onSubmit = (formData) => {
        let code = '';
        for (let i = 1; i < 9; i++) {
            code += formData[`code${i}`];
        }
        props.verifyCode(email, code);
    }

    useEffect(() => {
        if (props.validCode) {
            props.onClickSubmit(2);
        }
    }, [props.validCode])

    return (
        <div className="section" style={{ width: '100%' }}>
            <Typography sx={{ fontSize: '24px', fontWeight: 500, textAlign: 'center', mt: '50px' }}>Please check your email</Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: '50px' }}>
                <Typography sx={{ fontSize: 18, fontWeight: 400, color: 'grey.placeholder' }}>We`ve sent a code to </Typography>
                <Typography sx={{ fontSize: 18, fontWeight: 700, marginLeft: '5px', color: 'grey.placeholder' }}>
                    {email}
                </Typography>
            </Box>

            <CodeReduxForm wrongCode={props.wrongCode} 
            resendCode={props.resendCode}
            onSubmit={onSubmit} onClickSubmit={() => props.onClickSubmit(2)} />
        </div>
    );
}

let mapStateToProps = (state) => {
    return {
        wrongCode: state.auth.wrongCode,
        validCode: state.auth.validCode
    }
};

export default connect(mapStateToProps, {
    verifyCode, resendCode
})(CodeDialog);