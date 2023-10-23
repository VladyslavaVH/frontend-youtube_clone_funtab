import React from "react";
import { useParams } from 'react-router-dom';
import { Avatar, Box, Card, CardContent, CardMedia, Container, Stack, Typography, useMediaQuery } from '@mui/material';
import { ReactComponent as AddMenu } from '../../assets/add_menu.svg';
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
        "&::-webkit-scrollbar": {
            display: 'none',
        },
    },
}));

const MyCard = styled(Card)(({theme}) => ({
    display: 'flex',    
    p: 0,
    marginTop: '2.5%',
    // minWidth: '195px',
    // minHeight: '110px',
    width: '50vw', 
    height: '100%', 
    maxHeight: '305px', 
    // [theme.breakpoints.between('mobile', 'tablet')]: {
    //     minWidth: '343px',
    //     marginTop: '16px'
    // },
    boxShadow: 'none',
    border: "2px solid transparent", 
    borderRadius: '5px', 
    borderColor: 'transparent',
    backgroundColor: theme.palette.background.default, 
}));

const MyCardMedia = styled(CardMedia)(({theme}) => ({
    width: '50%',
    height: 'inherit',
    ":hover": {
        cursor: "pointer",
    },
    // [theme.breakpoints.between('mobile', 'laptop')]: {
    //     height: '135px',
    // },
    // [theme.breakpoints.between('mobile', 'tablet')]: {
    //     height: '193px',
    // },
    borderTopLeftRadius: '3px',
    borderBottomLeftRadius: '3px',
}));

const MyCardContent = styled(CardContent)(({theme}) => ({
    padding: '13px',
    width: 'inherit',
    '&:last-child': {
        paddingBottom: '0px',
    },    
    // [theme.breakpoints.between('mobile', 'laptop')]: {
    //     paddingTop: '11px',
    //     paddingLeft: '11px',
    //     paddingRight: '11px',
    //     '&:last-child': {
    //         paddingBottom: '11px',
    //     },
    // },
    // [theme.breakpoints.between('mobile', 'tablet')]: {
    //     paddingTop: '16px',
    //     paddingLeft: '13px',
    //     paddingRight: '13px',
    //     '&:last-child': {
    //         paddingBottom: '12px',
    //     },
    //}
    
}));

const Title = styled(Typography)(({theme}) => ({
    ":hover": {
        cursor: "pointer",
    },
    maxWidth: '470px',
    fontFamily: 'Roboto',
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: '27px',
    height: '57px',
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
    // [theme.breakpoints.between('mobile', 'laptop')]: {
    //     fontSize: '14px',
    //     lineHeight: '17px',
    //     height: '35px',
    //     marginBottom: '11px',  
    // },
    // [theme.breakpoints.between('mobile', 'tablet')]: {
    //     height: '16px',
    //     marginBottom: '0px',
    //     WebkitLineClamp: "1",
    // }
}))

const SubTitle = styled(Typography)(({theme}) => ({
    ":hover": {
        cursor: "pointer",
    },
    fontFamily: 'Roboto',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '21px',
    color: theme.palette.text.primary,
    whiteSpace: 'noWrap',
    // [theme.breakpoints.between('mobile', 'laptop')]: {
    //     fontSize: '14px',
    //     lineHeight: '15px',
    // },
    // [theme.breakpoints.between('mobile', 'tablet')]: {
    //     fontSize: '12px',
    //     lineHeight: '15px',
    //     color: theme.palette.text.primary
    // }
}))

const SubTitle2 = styled(Typography)(({theme}) => ({
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '16px',
    color: theme.palette.text.primary,
    padding: 0,
    width: 'max-content',
    marginRight: '1vw'
    // [theme.breakpoints.between('mobile', 'laptop')]: {
    //     fontSize: '10px',
    //     lineHeight: '13px',
    // },
    // [theme.breakpoints.between('mobile', 'tablet')]: {
    //     fontSize: '12px',
    //     lineHeight: '15px',
    // }
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


const SearchCard = (props) => {
    const iconsDir = '../ServerData/ChannelsImage/';

    const { video, 
    categories,
    channelId,
    channelName,
    dateCreate,
    description,
    duration,
    durationStr,
    extension,
    icon,
    id,
    imageUrl,
    isBlue,
    name,
    poster,
    title,
    totalDislikesCount,
    totalLikesCount,
    totalViewCount,
    type } = props;

    return <MyCard key={id}>
        {poster != null //poster
                ? <MyCardMedia 
                component="img"
                image={poster}
                style={{objectFit: "cover"}}
                title={title}
                 />
                : <MyCardMedia 
                 src={video}
                 component="video"
                 image={video}
                 height="100%"
                 type='video/mp4'
                 muted
                 style={{objectFit: "cover"}}
                 preload="metadata"
                 onLoadedMetadata={(e) => {e.target.currentTime = 60;}}
                 title={title} 
                 />}

        <MyCardContent>
            <Stack>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                }}>
                    <Title>{title}</Title>
                    <AddMenu style={{cursor: 'pointer', width: '24px', height: '24px', minWidth: '24px', minHeight: '24px'}} />
                </Box>

                <Box sx={{ p: 0, mt: '1vh', display: 'flex' }}>
                    <SubTitle2>{totalViewCount} views</SubTitle2>
                    <SubTitle2>{totalLikesCount} likes</SubTitle2>
                    <SubTitle2>{totalDislikesCount} dislikes</SubTitle2>
                </Box>

                <Stack sx={{m: '1vh 0'}} direction={'row'} alignItems='center'>
                    <Avatar src={imageUrl ? imageUrl : `${iconsDir}${icon}`}
                        sx={{width: '60px', height: '60px',}} />
                    <SubTitle sx={{ml: '15px'}}>{channelName}</SubTitle>
                </Stack>

                <SubTitle sx={{fontSize: 14, color: 'text.secondary'}}>
                    {new Date(Date.parse(dateCreate)).toLocaleString('en-CA', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                </SubTitle>
            </Stack>
        </MyCardContent>
    </MyCard>
}

export default SearchCard;