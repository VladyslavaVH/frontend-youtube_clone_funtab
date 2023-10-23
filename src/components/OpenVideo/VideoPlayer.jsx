import React, { useEffect, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import './VideoPlayer.css';

const VideoPlayer = (props) => {
    let { loading } = props;
    let playPauseBtn = document.querySelector('.play-pause-btn');
    let videoContainer = document.querySelector('.video-container');
    let video = document.getElementsByTagName('video')[0];

    document.addEventListener('DOMContentLoaded', () => {
        playPauseBtn = document.querySelector('.play-pause-btn');
        videoContainer = document.querySelector('.video-container');
        video = document.getElementsByTagName('video')[0];
    });

    //Play/Pause
    document.addEventListener('keydown', e => {
        switch (e.key.toLowerCase()) {
            case ' ':
            case 'k':
                togglePlay();
                break;        
            default:
                break;
        }
    });

    const togglePlay = (e) => {
        video.paused ? video.play() : video.pause();
    }

    const onPlay = () => {
        videoContainer.classList.remove('paused');
    }
    
    const onPause = () => {
        videoContainer.classList.add('paused');
    }

    return <div className="video-container">
        <div className="video-controls-container">
            <div className="timeline-container"></div>
            <div className="controls">
                <button className="play-pause-btn" onClick={togglePlay}>
                    <svg className="play-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 19.3171V4.737C5 3.9661 5.83547 3.48511 6.50213 3.87221L19.4622 11.3974C20.1367 11.789 20.1232 12.7676 19.4382 13.1405L6.47811 20.1954C5.81175 20.5581 5 20.0758 5 19.3171Z" 
                        fill="white" />
                    </svg>
                    <svg className="pause-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="5" y="4" width="4" height="16" rx="2" fill="white" />
                        <rect x="15" y="4" width="4" height="16" rx="2" fill="white" />
                    </svg>
                </button>
            </div>
        </div>
        {
        loading
        ? <Skeleton variant='rectangular' width='inherit' height='55vh' animation="wave" />
        :<video onClick={togglePlay}
        onPlay={onPlay}
        onPause={onPause}
        src={props.videoPath} />}
    </div>
}

export default VideoPlayer;