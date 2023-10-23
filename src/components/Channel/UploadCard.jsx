import React, { useState, useEffect,  } from "react";
import { Skeleton, Card, CardMedia, Button, Box, Stack, Avatar, Typography, Tooltip, Popover, Divider, CardContent, CardActions, useMediaQuery } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import {ReactComponent as PublicIcon } from '../../assets/public.svg';
import { ReactComponent as AddMenu } from '../../assets/add_menu.svg';
import { useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import addVideo from '../../assets/big_upload_video.svg';

const StyledAddVideoBox = styled(Box)(({ theme }) => ({
    marginLeft: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20vw',
    height: '30vh',
    background: theme.palette.background.paper,
    [theme.breakpoints.between('mobile', 'laptop')]: {
        width: '30vw',
        height: '45vh',
    },
}));

const UploadButton = styled(Button)(({ theme }) => ({
    fontSize: 18, 
    fontWeight: 400, 
    fontFamily: 'Roboto',
    textTransform: 'none',
    backgroundColor: theme.palette.primary.main,
    ':hover': {
        backgroundColor: theme.palette.action.buttonHover
    }
}));

const MyCard = styled(Card)(({theme}) => ({
    marginBottom: '2.5%',
    marginLeft: 0,
    p: 0,
    minWidth: '246px',
    minHeight: '138px',
    // [theme.breakpoints.between('mobile', 'tablet')]: {
    //     minWidth: '343px',
    //     marginTop: '16px'
    // },
    //maxHeight: '389px', 
    boxShadow: 'none',
    border: "2px solid transparent", 
    borderRadius: '5px', 
    borderColor: 'transparent',
    width: '23%', 
    height: '100%', 
    backgroundColor: theme.palette.background.default, 
}));

const MyCardContent = styled(CardContent)(({theme}) => ({
    paddingTop: '23px',
    paddingLeft: '15px',
    paddingRight: '15px',
    '&:last-child': {
        paddingBottom: '19px',
    },    
    minWidth: 'inherit',
    minHeight: 'inherit',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}));

const MyCardMedia = styled(CardMedia)(({theme}) => ({
    height: '225px',
    ":hover": {
        cursor: "pointer",
    },
    borderTopLeftRadius: '3px',
    borderTopRightRadius: '3px',
}));

const UploadCard = (props) => {
    const {marginRight} = props;
    return <MyCard sx={{p: 0, marginRight: marginRight}}>
        <MyCardMedia
        component="img"
        image={addVideo}
        title="Upload video"
        />
    <MyCardContent>
        <UploadButton size='small' variant="contained" disableRipple disableTouchRipple >
            Upload video
        </UploadButton>
    </MyCardContent>
</MyCard>;
}

export default UploadCard;