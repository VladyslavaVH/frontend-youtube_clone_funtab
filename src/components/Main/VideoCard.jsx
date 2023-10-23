import React, { useState, useEffect } from "react";
import { Skeleton, Card , CardMedia, Box, Stack, Avatar, Typography, Divider, CardContent, CardActions, useMediaQuery } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import ReactPlayer from "react-player";
import { ReactComponent as AddMenu } from '../../assets/add_menu.svg';
import { useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';

const MyCard = styled(Card)(({theme}) => ({
    margin: '1%',
    p: 0,
    minWidth: '260px',
    minHeight: '238px',
    [theme.breakpoints.between('mobile', 'tablet')]: {
        minWidth: '343px',
        marginTop: '16px'
    },
    maxHeight: '389px', 
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
    [theme.breakpoints.between('mobile', 'laptop')]: {
        paddingTop: '11px',
        paddingLeft: '11px',
        paddingRight: '11px',
        '&:last-child': {
            paddingBottom: '11px',
        },
    },
    [theme.breakpoints.between('mobile', 'tablet')]: {
        paddingTop: '16px',
        paddingLeft: '13px',
        paddingRight: '13px',
        '&:last-child': {
            paddingBottom: '12px',
        },
    }
    
}));

const MyCardMedia = styled(CardMedia)(({theme}) => ({
    height: '225px',
    ":hover": {
        cursor: "pointer",
    },
    [theme.breakpoints.between('mobile', 'laptop')]: {
        height: '135px',
    },
    [theme.breakpoints.between('mobile', 'tablet')]: {
        height: '193px',
    },
    borderTopLeftRadius: '3px',
    borderTopRightRadius: '3px',
}));

const Title = styled(Typography)(({theme}) => ({
    ":hover": {
        cursor: "pointer",
    },
    marginBottom: '19px',
    fontFamily: 'Roboto',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '21px',
    height: '43px',
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    [theme.breakpoints.between('mobile', 'laptop')]: {
        fontSize: '14px',
        lineHeight: '17px',
        height: '35px',
        marginBottom: '11px',  
    },
    [theme.breakpoints.between('mobile', 'tablet')]: {
        height: '16px',
        marginBottom: '0px',
        WebkitLineClamp: "1",
    }
}))

const SubTitle = styled(Typography)(({theme}) => ({
    ":hover": {
        cursor: "pointer",
    },
    fontFamily: 'Roboto',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '21px',
    color: theme.palette.text.secondary,
    whiteSpace: 'noWrap',
    marginBottom: '5px',
    [theme.breakpoints.between('mobile', 'laptop')]: {
        fontSize: '14px',
        lineHeight: '15px',
    },
    [theme.breakpoints.between('mobile', 'tablet')]: {
        fontSize: '12px',
        lineHeight: '15px',
        color: theme.palette.text.primary
    }
}))

const SubTitle2 = styled(Typography)(({theme}) => ({
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '16px',
    color: theme.palette.text.secondary,
    padding: 0,
    [theme.breakpoints.between('mobile', 'laptop')]: {
        fontSize: '10px',
        lineHeight: '13px',
    },
    [theme.breakpoints.between('mobile', 'tablet')]: {
        fontSize: '12px',
        lineHeight: '15px',
    }
}))

const MyAvatar = styled(Avatar)(({theme}) => ({
    ":hover": {
        cursor: "pointer",
    },
    margin: 0,
    width: '50px',
    height: '50px',
    marginRight: '15px',
    [theme.breakpoints.between('mobile', 'desktop')]: {
        width: '35px',
        height: '35px',
        marginRight: '11px',
    },
    [theme.breakpoints.between('mobile', 'tablet')]: {
        width: '40px',
        height: '40px',
        marginRight: '15px',
    }
}));

const VideoCard = (props) => {
    const { id, isBlue, video, videoPoster, videoName, channelImg, channelName, views, likes, lastVisit,
    marginRight} = props;
    const [isLoading, setLoading] = useState(false);
    const theme = useTheme();

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
    sx={{borderColor: isBlue ? 'primary.main' : 'transparent',
    marginRight: marginRight}} >        
        {isLoading
            ? <Skeleton variant="rectangular" animation="wave" height="225px" />
            //: <MyCardMedia image={videoPoster} />
            //: <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing />
            : videoPoster != null //poster
                ? <MyCardMedia 
                component="img"
                image={videoPoster}
                //title="Video poster"
                 />
                : <MyCardMedia 
                 //src={videoPoster}
                 component="video"
                 image={video}
                 height="225px"
                 type='video/mp4'
                 muted
                 style={{objectFit: "cover"}}
                 //controls
                 //autoPlay
                 preload="metadata"
                 onLoadedMetadata={(e) => {e.target.currentTime = 60;}}
                 //title={videoName} 
                 />
        }
        <MyCardContent>
            {isLoading
                ? <Skeleton variant="rectangular" animation="wave" height='43px' />
                : !matches && <Title>{videoName}</Title>
            }

            <Box sx={{p: '0', display: "flex", direction: "row", alignItems: "center"}} >
                {isLoading
                    ? <Skeleton variant="circular" sx={{mr: 1}} animation="wave"
                        width={60} height={55} />
                    : <MyAvatar src={channelImg} />}

                {isLoading
                    ? <Skeleton variant="rectangular" animation="wave"
                        width={256} height={30} />
                    : <Stack direction="column" sx={{flexGrow: 1}}>
                        <SubTitle>{channelName}</SubTitle>

                        {!matches
                            ? <Box sx={{ p: 0, width: 'inherit', display: 'flex', justifyContent: 'space-between' }}>
                                <SubTitle2>{`${views}`}</SubTitle2>
                                <SubTitle2>{`${likes}`}</SubTitle2>
                                <SubTitle2>{lastVisit}</SubTitle2>
                            </Box>
                            : <Title>{videoName}</Title>
                        }
                    </Stack>
                }

                {matches && <AddMenu />}
            </Box>
            {matches
                && <Box sx={{ p: 0, mt: '15px', width: 'inherit', display: 'flex', justifyContent: 'space-between' }}>
                    <SubTitle2>{`${views} views`}</SubTitle2>
                    <SubTitle2>{`${likes} likes`}</SubTitle2>
                    <SubTitle2>{lastVisit}</SubTitle2>
                </Box>
            }
        </MyCardContent>
    </MyCard>;
}

export default VideoCard;