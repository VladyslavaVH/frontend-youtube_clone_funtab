import React, { useState, useEffect,  } from "react";
import { Skeleton, Card, CardMedia, Box, Stack, Avatar, Typography, Tooltip, Popover, Divider, CardContent, CardActions, useMediaQuery } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import ReactPlayer from "react-player";
import {ReactComponent as PublicIcon } from '../../assets/public.svg';
import {ReactComponent as PrivateIcon } from '../../assets/private.svg';
import { ReactComponent as AddMenu } from '../../assets/add_menu.svg';
import { useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

const MyCard = styled(Card)(({theme}) => ({
    marginBottom: '2.5%',
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
    minHeight: 'inherit'
    
}));

const MyCardMedia = styled(CardMedia)(({theme}) => ({
    height: '225px',
    ":hover": {
        cursor: "pointer",
    },
    borderTopLeftRadius: '3px',
    borderTopRightRadius: '3px',
}));

const Title = styled(Typography)(({theme}) => ({
    ":hover": {
        cursor: "pointer",
    },
    fontFamily: 'Roboto',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '21px',
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
}))

const SubTitle2 = styled(Typography)(({theme}) => ({
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '16px',
    color: theme.palette.text.secondary,
    padding: 0,
}))

const VideoCard = (props) => {
    const { id, isBlue, video, videoPoster, videoName, channelImg, channelName, views, likes, lastVisit,
    marginRight} = props;
    const [isLoading, setLoading] = useState(false);
    const theme = useTheme();
    const videoRef = React.createRef();

    const matches = useMediaQuery(theme.breakpoints.between('mobile', 'tablet'));
    
    const navigate = useNavigate();
    const openVideo = () => {
        navigate(`/video/${id}`);
    }

    // useEffect(() => {
    //     setTimeout(setLoading(true), 3000);
    // }, [isLoading]);
                                     {/* props.isAuth */}
    return <MyCard key={props.id} onClick={openVideo}
    sx={{borderColor: false ? 'primary.main' : 'transparent',
    marginRight: marginRight}} >        
        {isLoading
            ? <Skeleton variant="rectangular" animation="wave" height="225px" />
            :videoPoster != null //poster
                ? <MyCardMedia
                    component="img"
                    image={videoPoster}
                //title="Video poster"
                />
                : <MyCardMedia
                    //src={videoPoster}
                    component="video"
                    image={video}
                    maxHeight="225px"
                    type='video/mp4'
                    muted
                    style={{ objectFit: "cover" }}
                    //controls
                    //autoPlay
                    preload="metadata"
                    onLoadedMetadata={(e) => { e.target.currentTime = 60; }}
                //title={videoName} 
                />
            
        }
        
        <MyCardContent>
            {isLoading
                ? <Skeleton variant="rectangular" animation="wave" width="inherit" height='21px' />
                : !matches && <Title>{videoName}</Title>
            }

            <Box sx={{p: '0', display: "flex", flexDirection: "column", alignItems: "left"}} >
                {isLoading
                    ? <Skeleton variant="rectangular" animation="wave"
                        width='inherit' height='21px' sx={{m: '1vh 0'}} />
                    : <Stack direction={'row'} sx={{m: '1vh 0'}}>
                        {true
                        ?<PublicIcon style={{ cursor: 'pointer'}}/>
                        :<PrivateIcon style={{ cursor: 'pointer'}}/>}
                        <Title sx={{color: 'primary.main', ml: '10px'}}>
                            {true
                            ? 'Public'
                            : 'Private'}
                        </Title>
                    </Stack>}

                    { isLoading
                    ? <Skeleton variant="rectangular" animation="wave"
                    width='inherit' height='16px' />
                    : <Box sx={{ p: 0, width: 'inherit', display: 'flex', justifyContent: 'space-between' }}>
                        <SubTitle2>{`${views} views`}</SubTitle2>
                        <SubTitle2>{`${likes} likes`}</SubTitle2>
                        <SubTitle2>{lastVisit}</SubTitle2>
                    </Box>}
            </Box>
        </MyCardContent>
        
    </MyCard>;
}

export default VideoCard;