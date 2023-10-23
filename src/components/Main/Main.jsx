import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Container, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SubChannels from '../Scroll/SubChannels/SubChannels';
import { getUnAuthVideos, getAuthVideos } from '../../redux/auth-reducer';
import VideoCard from "./VideoCard";
import Tags from "../Scroll/Tags/Tags";
import axios from "axios";

const Main = (props) => {
    const theme = useTheme();
    const isLaptop = useMediaQuery(theme.breakpoints.between('mtMiddle', 1502));
    const isMobileMatches = useMediaQuery(theme.breakpoints.between('mobile', 'mtMiddle'));
    const posterDir = '../ServerData/Posters/';
    const channelImgDir = '../ServerData/ChannelsImage/';
    const videosDir = '../ServerData/Videos/';
    let isBlue = false;
    const [videos, setVideos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    const [totalCount, setTotalCount] = useState(0); 

    useEffect(() => {
        if (fetching) {
            axios.get(
                `https://api.funtab.com.ua/video/video_read_pagin.php?page=${currentPage}&count=${12}&jwt=${localStorage.getItem('jwt')}`)
            .then(response => {
                setVideos([...videos, ...response.data.data]);
                setCurrentPage(prevState => prevState + 1);
                setTotalCount(response.data.totalCount);
            })
            .finally(() => setFetching(false));            
        }
    }, [fetching]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);            
        }
    }, [])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + (window.innerHeight - (window.innerHeight / 10)))
        && (videos.length < totalCount)) {
            console.log('scroll');
            //setFetching(true);
        }
        // console.log('scrollHeight:', e.target.documentElement.scrollHeight);
        // console.log('scrollTop:', e.target.documentElement.scrollTop);
        // console.log('innerHeight:', window.innerHeight);
    }
    // useEffect(() => {
    //     if (!props.isAuth) {
    //         props.getUnAuthVideos();
    //     }

    // }, [props.isAuth]);

    return <Container maxWidth="xl" className="main" disableGutters
         sx={{display: 'flex', justifyItems: 'center', justifyContent: 'center',
            flexWrap: 'wrap', flexFlow: 1
        }}>

        <div id="channelContainer">            
            {props.isAuth ? <SubChannels subscriptions={props.subs} blueChannels={props.blueChannels} />
            : null}
        </div>

        {/* {props.videos.map((card) => { */}
        {videos.map((card) => {
            isBlue = false;
            for (const b of props.blueChannels) {
                if (card.channelName == b) {
                    isBlue = true;
                }
            }

            return <VideoCard
                isBlue={isBlue}
                id={card.id}
                key={card.id}
                video={`${videosDir}${card.name}`}
                videoPoster={card.poster ? `${posterDir}${card.poster}` : null}
                videoName={card.title}
                channelImg={`${channelImgDir}${card.channelIcon}`}
                channelName={card.channelName}
                views={card.totalViewCount}
                likes={card.totalLikesCount}
                lastVisit={card.dateCreate} />
        })}
    </Container>;
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        videos: state.auth.videos,
        blueChannels: state.auth.blueChannels,
        subs: state.auth.subs,
    }
};

export default connect(mapStateToProps,
    { getUnAuthVideos, getAuthVideos }
)(Main);