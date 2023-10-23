import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import emptySearch from '../../assets/empty/empty_search.svg';
import { Box, Container, Card, } from '@mui/material';
import axios from "axios";
import SearchCard from "./SearchCard";

const SearchPage = (props) => {
    const videoDir = '../ServerData/Videos/';
    const {text} = useParams();
    const [videos, setVideos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    const [totalCount, setTotalCount] = useState(0); 

    useEffect(() => {
        if (fetching) {
            axios.get(
                `https://api.funtab.com.ua/search/search.php?page=${currentPage}&count=5&searchText=${text}&date=null&duration=null&type=null`)
            .then(response => {
                setVideos([...videos, ...response.data.data]);
                setCurrentPage(prevState => prevState + 1);
                setTotalCount(10);
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
            setFetching(true);
        }
        // console.log('scrollHeight:', e.target.documentElement.scrollHeight);
        // console.log('scrollTop:', e.target.documentElement.scrollTop);
        // console.log('innerHeight:', window.innerHeight);
    }

    return <Container maxWidth='xl' 
    sx={{display: 'flex', flexDirection: 'column', 
    justifyContent: (videos.length == 0) ? 'center' : 'space-between', 
    alignItems: 'center',
    //height: '89vh', overflowY: 'scroll'
    }}>
        {videos.map(video => {
            return <SearchCard
            video={`${videoDir}${video.name}`}
            categories={video.categories}
            channelId={video.channelId}
            channelName={video.channelName}
            dateCreate={video.dateCreate}
            description={video.description}
            duration={video.duration}
            durationStr={video.duration}
            extension={video.extension}
            icon={video.icon}
            id={video.id}
            imageUrl={video.imageUrl}
            isBlue={video.isBlue}
            name={video.name}
            poster={video.poster}
            title={video.title}
            totalDislikesCount={video.totalDislikesCount}
            totalLikesCount={video.totalLikesCount}
            totalViewCount={video.totalViewCount}
            type={video.type} />
        })}

        {(videos.length == 0)
         &&   <Box component='img' src={emptySearch} 
        sx={{width: 300, height: 300, alignSelf: 'center'}} />}
    </Container>
}

export default SearchPage;