import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Box, Button, Avatar, Card, CardContent, CardMedia, Container, List, ListItem, Stack, Typography, useMediaQuery, Divider } from '@mui/material';
import { ReactComponent as AddMenu } from '../../assets/add_menu.svg';
import { ReactComponent as Line } from '../../assets/line.svg';
import { ReactComponent as HideAccordion } from '../../assets/hide_accordion.svg';
import { ReactComponent as ShowAccordion } from '../../assets/show_accordion.svg';
import { ReactComponent as FilterCommentsIcon } from '../../assets/filter_comments_icon.svg';
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import VideoPlayer from "./VideoPlayer";
import ListCard from "./ListCard";
import axios from "axios";
import { connect } from "react-redux";
import { initializeVideoPage } from '../../redux/video-reducer';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: '50px',
    height: '50px',
    marginRight: '15px'
}))

const Title = styled(Typography)(({ theme }) => ({
    ":hover": {
        cursor: "pointer",
    },
    marginBottom: '19px',
    fontFamily: 'Roboto',
    fontSize: '18px',
    fontWeight: 400,
    //lineHeight: '21px',
    height: '43px',
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

const MyButton = styled(Button)(({ theme }) => ({
    fontSize: 14,
    fontWeight: 400,
    padding: '0px 8px',
    textTransform: 'none',
    height: 'max-content',
    backgroundColor: 'transparent',
    borderRadius: '3px',
    border: '1px solid',
    borderColor: theme.palette.text.likeBtn,
    color: theme.palette.text.likeBtn,
    ':hover': {
        background: 'transparent'
    }
}))

const SubTitle = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    fontWeight: 400,
    color: theme.palette.text.likeBtn,
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

const SubTitle2 = styled(Typography)(({ theme }) => ({
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

const style = {
    m: 0,
    p: 0,
    width: 'inherit',
    mb: '33px'
}

const OpenVideo = (props) => {
    let { mainChannelId,
        icon,
        imgUrl,
        loading,
        titleText,
        name,
        description,
        poster,
        isLiked,
        isDisliked,
        likes,
        dislikes,
        views,
        date,
        channelName,
        channelId,
        channelIcon,
        channelImgUrl,
        comments,
        offerList } = props;
    const [showAccordion, setShowAccordion] = useState(false);
    const theme = useTheme();
    const { id } = useParams();
    const [fetching, setFetching] = useState(true);
    const [video, setVideo] = useState(null);
    const [title, setTitle] = useState(null);

    useEffect(() => {
        props.initializeVideoPage(id, props.mainChannelId);
        // if (fetching) {
        //     axios.get(
        //         `https://api.funtab.com.ua/video/video_read_one.php?id=${id}&channelId=${props.mainChannelId}&jwt=${localStorage.getItem('jwt')}`)
        //     .then(response => {
        //         console.log(response);
        //         setVideo(response.data.video.name);
        //         setTitle(response.data.video.title);
        //     })
        //     .finally(() => setFetching(false));            
        // }
    }, []);

    const toggleAccordion = () => {
        setShowAccordion(!showAccordion);
    }

    const matches = useMediaQuery(theme.breakpoints.between('mobile', 'tablet'));
    const videosDir = '../ServerData/Videos/';

    return <Container maxWidth="xl" sx={{
        display: 'flex', justifyContent: 'space-between', mt: '9vh', alignItems: 'flex-start',
    }}>
        <Box style={{ width: '59vw', maxWidth: '1107px' }}>
            <VideoPlayer loading={props.loading} videoPath={`${videosDir}${name}`} />
            <Stack direction={'row'} maxWidth='inherit' margin='25px 0'
                justifyContent="space-between" width='inherit' >
                <Title>{titleText}</Title>

                <Box width='37%' sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <MyButton size="small"
                        sx={{
                            backgroundColor: isLiked ? 'text.likeBtn' : 'transparent',
                            color: isLiked ? 'white' : 'text.likeBtn',
                        }}>
                        {likes}
                    </MyButton>

                    <MyButton size="small"
                        sx={{
                            backgroundColor: isDisliked ? 'text.likeBtn' : 'transparent',
                            color: isDisliked ? 'white' : 'text.likeBtn',
                        }}>
                        {dislikes}
                    </MyButton>

                    <SubTitle>
                        {views}
                    </SubTitle>

                    <SubTitle>
                        {date}
                    </SubTitle>
                </Box>
            </Stack>

            <Stack width='21%' direction='row'
                sx={{ mb: '25px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <StyledAvatar src={'../ServerData/ChannelsImage/' + channelIcon} />
                <Typography>{channelName}</Typography>
                <Button size="small" disableTouchRipple disableRipple
                    sx={{
                        backgroundColor: false ? 'text.likeBtn' : 'primary.main', ':hover': { backgroundColor: 'action.buttonHover' },
                        color: 'white', textTransform: 'none', fontWeight: 400
                    }}>
                    Follow
                </Button>
            </Stack>

            {description && <Box>
                <Typography sx={{ display: showAccordion ? '' : 'none', width: '50%', ml: '6%', fontSize: 14, fontWeight: 400 }}>
                    {description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Line style={{ width: '83%' }} />
                    <Box sx={{ display: 'flex' }} onClick={toggleAccordion}>
                        <Typography>Show description</Typography>
                        {showAccordion
                            ? <HideAccordion />
                            : <ShowAccordion />
                        }
                    </Box>
                </Box>
            </Box>}

            <Box sx={{ mt: '40px', width: '88%', marginX: 'auto' }}>
                {true
                    ? <Box>
                        <Stack direction={'row'}>
                            <Typography>{`${comments.length} Comments`}</Typography>
                            <FilterCommentsIcon style={{ marginLeft: '10px' }} />
                        </Stack>
                        <Stack sx={{ mt: '25px', width: 'inherit' }} direction={'row'} alignItems='center'>
                            <StyledAvatar src={'../ServerData/ChannelsImage/' + icon} />
                            <Typography sx={{ color: 'grey.placeholder', cursor: 'text' }}>
                                Type your comment
                            </Typography>
                        </Stack>
                    </Box>//comment forma
                    : null}

                {/*comment component*/}
                {comments.map((c) => {
                    return <Stack key={c.id} sx={{ mt: '25px' }}>
                        <Box>
                            <Stack direction={'row'} sx={{ mb: '15px' }}>
                                <StyledAvatar src={'../ServerData/ChannelsImage/' + c.icon} />
                                <Typography>{c.text}</Typography>
                            </Stack>
                        </Box>
                        <Stack direction={'row'} width='31%' justifyContent={'space-between'}>
                            <SubTitle2>{c.dateCreate}</SubTitle2>
                            <SubTitle2>{c.totalLikesCount}</SubTitle2>
                            <SubTitle2>{c.totalDislikesCount}</SubTitle2>
                            <SubTitle2>reply</SubTitle2>

                        </Stack>
                    </Stack>
                })}

                <Stack sx={{ mt: '25px' }}>
                    <Box>
                        <Stack direction={'row'} sx={{ mb: '15px' }}>
                            <StyledAvatar src={'../ServerData/ChannelsImage/smile.svg'} />
                            <Typography>My favorite was the cat walking the girl to the bus stop. My cat followed me to the bus stop from 2nd to 8th grade and was sometimes there waiting for me when I got off the bus. The kids were mean and called me cat girl but I didn’t  care. It made me feel special to have a bond like that with my cat.My favorite was the cat walking the girl to the bus stop. My cat followed me to the bus stop from 2nd to 8th grade and was sometimes there waiting for me when I got off the bus. The kids were mean and called me cat girl but I didn’t  care. It made me feel special to have a bond like that with my cat.My favorite was the cat walking the girl to the bus stop. My cat followed me to the bus stop from 2nd to 8th grade and was sometimes there waiting for me when I got off the bus. The kids were mean and called me cat girl but I didn’t  care. It made me feel special to have a bond like that with my cat.</Typography>
                        </Stack>
                    </Box>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Stack direction={'row'} width='31%' justifyContent={'space-between'}>
                            <SubTitle2>{'2 days ago'}</SubTitle2>
                            <SubTitle2>{'134 likes'}</SubTitle2>
                            <SubTitle2>{'56 dislikes'}</SubTitle2>
                            <SubTitle2>reply</SubTitle2>
                        </Stack>
                        <SubTitle2>show less</SubTitle2>
                    </Stack>
                </Stack>
            </Box>



        </Box>

        <List sx={{
            width: '29vw', //height: '82vh', 
            maxHeight: '2124px', overflowY: 'scroll'
        }}
            style={{ '&::WebkitScrollbar': { display: 'none' } }}>
            
            <ListItem sx={{ ...style }}>
                <ListCard videoPoster={`../ServerData/Posters/1.jpg`} />
            </ListItem>
            <ListItem sx={{ ...style }}>
                <ListCard videoPoster={`../ServerData/Posters/1.jpg`} />
            </ListItem>
            <ListItem sx={{ ...style }}>
                <ListCard videoPoster={`../ServerData/Posters/1.jpg`} />
            </ListItem>
            <ListItem sx={{ ...style }}>
                <ListCard videoPoster={`../ServerData/Posters/1.jpg`} />
            </ListItem>
            <ListItem sx={{ ...style }}>
                <ListCard videoPoster={`../ServerData/Posters/1.jpg`} />
            </ListItem>
            <ListItem sx={{ ...style }}>
                <ListCard videoPoster={`../ServerData/Posters/1.jpg`} />
            </ListItem>
            <ListItem sx={{ ...style }}>
                <ListCard videoPoster={`../ServerData/Posters/1.jpg`} />
            </ListItem>
            <ListItem sx={{ ...style }}>
                <ListCard videoPoster={`../ServerData/Posters/1.jpg`} />
            </ListItem>
            <ListItem sx={{ ...style }}>
                <ListCard videoPoster={`../ServerData/Posters/1.jpg`} />
            </ListItem>
            <ListItem sx={{ ...style }}>
                <ListCard videoPoster={`../ServerData/Posters/1.jpg`} />
            </ListItem>
            <ListItem sx={{ ...style }}>
                <ListCard videoPoster={`../ServerData/Posters/1.jpg`} />
            </ListItem>
            <ListItem sx={{ ...style }}>
                <ListCard videoPoster={`../ServerData/Posters/1.jpg`} />
            </ListItem>
            <ListItem sx={{ ...style }}>
                <ListCard videoPoster={`../ServerData/Posters/1.jpg`} />
            </ListItem>

        </List>


    </Container>

}

let mapStateToProps = (state) => {
    return {
        mainChannelId: state.auth.id,
        icon: state.auth.icon,
        imgUrl: state.auth.imgUrl,
        loading: state.video.loading,
        titleText: state.video.titleText,
        name: state.video.name,
        description: state.video.description,
        poster: state.video.poster,
        isLiked: state.video.isLiked,
        isDisliked: state.video.isDisliked,
        likes: state.video.likes,
        dislikes: state.video.dislikes,
        views: state.video.views,
        date: state.video.date,
        channelName: state.video.channelName,
        channelId: state.video.channelId,
        channelIcon: state.video.icon,
        channelImgUrl: state.video.imgUrl,
        comments: state.video.comments,
        offerList: state.video.offerList
    }
}

export default connect(mapStateToProps, {
    initializeVideoPage
})(OpenVideo);