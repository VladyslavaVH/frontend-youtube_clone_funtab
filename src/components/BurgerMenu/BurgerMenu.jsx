import React, { useState, useEffect } from "react";
import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ReactComponent as BurgerIcon } from '../../assets/burger_icon.svg';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';
import { ReactComponent as HomeIcon } from '../../assets/BurgerSubIcons/home.svg';
import { ReactComponent as HistoryIcon } from '../../assets/BurgerSubIcons/history.svg';
import { ReactComponent as LikedIcon } from '../../assets/BurgerSubIcons/liked.svg';
import { ReactComponent as WatchLaterIcon } from '../../assets/BurgerSubIcons/watch_later.svg';
import { ReactComponent as SettingsIcon } from '../../assets/BurgerSubIcons/settings.svg';
import { ReactComponent as HelpIcon } from '../../assets/BurgerSubIcons/help.svg';
import { ReactComponent as FeedbackIcon } from '../../assets/BurgerSubIcons/feedback.svg';
import { ReactComponent as PlaylistIcon } from '../../assets/BurgerSubIcons/playlist.svg';
import { ReactComponent as SportsIcon } from '../../assets/BurgerSubIcons/sports.svg';
import { ReactComponent as GamesIcon } from '../../assets/BurgerSubIcons/games.svg';
import { ReactComponent as MusicIcon } from '../../assets/BurgerSubIcons/music.svg';
import { ReactComponent as PoliticsIcon } from '../../assets/BurgerSubIcons/politics.svg';
import { ReactComponent as NewsIcon } from '../../assets/BurgerSubIcons/news.svg';
import { ReactComponent as TrendsIcon } from '../../assets/BurgerSubIcons/trends.svg';
import { ReactComponent as MoviesIcon } from '../../assets/BurgerSubIcons/movies.svg';
import style from '../Header/Header.module.css';
import { NavLink, Link, } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleTagsDisplay, toggleBlur } from '../../redux/ui-reducer';

import s from './BurgerMenu.module.css';

const StyledPaper = styled(Paper)(({ theme }) => ({
    width: 'inherit',
    height: 'max-content',
    paddingTop: '18px',
    paddingBottom: '18px',
    paddingLeft: '25px',
    display: 'flex',
    alignItems: 'center',

    top: 0,
    position: "sticky",
    background: "white",
    zIndex: 100,
}));

const StyledBox = styled(Box)(({ theme }) => ({
    padding: 0,
    height: 'max-content',
    [theme.breakpoints.between('mobile', 'laptop')]: {
        marginTop: '5vh'
    },

}));

const StyledItem = styled(ListItem)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
    margin: 0
}));

const StyledItemButton = styled(ListItemButton)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.action.listHover,
    },
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    margin: 0
}));

const StyledItemText = styled(ListItemText)(({ theme }) => ({
    fontSize: 18,
    marginLeft: 15,
    [theme.breakpoints.between('mobile', 'laptop')]: {
        fontSize: '14px',
        marginLeft: 10
    },

}));

const StyledMainBox = styled(Box)(({ theme }) => ({
    width: 241, height: '100vh',
    [theme.breakpoints.between('mobile', 'laptop')]: {
        width: 200
    },

}));

const StyledContentBox = styled(Box)(({ theme }) => ({
    [theme.breakpoints.between('laptop', 'desktop')]: {
        //height: '90vh'
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    
    [theme.breakpoints.between('mobile', 'laptop')]: {
        //height: '90vh'
    },

}));

const BurgerMenu = (props) => {
    const [left, setLeft] = useState(false);
    let main;
    let channelContainer;
    let tagsContainer;
    let blackoutBlock;

    // useEffect(() => {
    //     main = document.getElementsByClassName('main')[0].style;
    //     channelContainer = document.getElementById('channelContainer').style;
    //     tagsContainer = document.getElementById('tagsContainer').style;
    //     blackoutBlock = document.getElementById('blackout-block').style;
    // });

    const toggleDrawer = (open) => (e) => {
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }

        setLeft(open);
        props.toggleBlur(open);
    };

    // useEffect(() => {
    //     if (left) {
    //         tagsContainer.filter = main.filter = 'blur(3px)';
    //         channelContainer.filter = 'blur(3px)';
    //         blackoutBlock.opacity = 1;
    //     } else {
    //         tagsContainer.filter = main.filter = 'blur(0px)';
    //         channelContainer.filter = 'blur(0px)';
    //         blackoutBlock.opacity = 0;
    //     }
    // }, [left]);

    const list = () => (
        <StyledMainBox
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}>
            <List  >
                <StyledPaper elevation={0} >
                    <BurgerIcon />
                    <LogoIcon style={{ marginLeft: '15px', maxHeight: '24px' }} />
                </StyledPaper>
                <Divider />


                <StyledContentBox>
                    <StyledItem >
                        <StyledItemButton component={Link}
                            to={'/'} disableTouchRipple >
                            <HomeIcon className={s.svg} />
                            <StyledItemText primary='Home' />
                        </StyledItemButton>
                    </StyledItem>


                    <StyledBox >
                        <StyledItem >
                            <StyledItemButton component={Link}
                                to={'/history'} disableTouchRipple >
                                <HistoryIcon className={s.svg} />
                                <StyledItemText primary='History' />
                            </StyledItemButton>
                        </StyledItem>
                        <StyledItem  >
                            <StyledItemButton component={Link}
                                to={'/liked_videos'} disableTouchRipple >
                                <LikedIcon className={s.svg} />
                                <StyledItemText primary='Liked videos' />
                            </StyledItemButton>
                        </StyledItem>
                        <StyledItem >
                            <StyledItemButton component={Link}
                                to={'/watch_later'} disableTouchRipple >
                                <WatchLaterIcon className={s.svg} />
                                <StyledItemText primary='Watch later' />
                            </StyledItemButton>
                        </StyledItem>
                    </StyledBox>

                    <StyledBox >
                        <StyledItem >
                            <StyledItemButton disableTouchRipple  >
                                <SettingsIcon className={s.svg} />
                                <StyledItemText primary='Settings' />
                            </StyledItemButton>
                        </StyledItem>
                        <StyledItem >
                            <StyledItemButton disableTouchRipple >
                                <HelpIcon className={s.svg} />
                                <StyledItemText primary='Help' />
                            </StyledItemButton>
                        </StyledItem>
                        <StyledItem >
                            <StyledItemButton disableTouchRipple >
                                <FeedbackIcon className={s.svg} />
                                <StyledItemText primary='Send feedback' />
                            </StyledItemButton>
                        </StyledItem>
                    </StyledBox>

                    {/* props.isAuth */}
                    {false
                        ? <StyledBox>
                            <StyledItem>
                                <StyledItemButton>
                                    <PlaylistIcon className={s.svg} />
                                    <StyledItemText primary="Playlist 1" />
                                </StyledItemButton>
                            </StyledItem>
                            <StyledItem>
                                <StyledItemButton>
                                    <PlaylistIcon className={s.svg} />
                                    <StyledItemText primary="Playlist 2" />
                                </StyledItemButton>
                            </StyledItem>
                        </StyledBox>
                        : null}

                    <StyledBox>
                        <StyledItem>
                            <StyledItemButton component={Link}
                                to={'/categories/sports'} >
                                <SportsIcon className={s.svg} />
                                <StyledItemText primary="Sports" />
                            </StyledItemButton>
                        </StyledItem>
                        <StyledItem>
                            <StyledItemButton component={Link}
                                to={'/categories/games'} >
                                <GamesIcon className={s.svg} />
                                <StyledItemText primary="Games" />
                            </StyledItemButton>
                        </StyledItem>
                        <StyledItem>
                            <StyledItemButton component={Link}
                                to={'/categories/music'} >
                                <MusicIcon className={s.svg} />
                                <StyledItemText primary="Music" />
                            </StyledItemButton>
                        </StyledItem>
                        <StyledItem>
                            <StyledItemButton component={Link}
                                to={'/categories/politics'} >
                                <PoliticsIcon className={s.svg} />
                                <StyledItemText primary="Politics" />
                            </StyledItemButton>
                        </StyledItem>
                        <StyledItem>
                            <StyledItemButton component={Link}
                                to={'/categories/news'} >
                                <NewsIcon className={s.svg} />
                                <StyledItemText primary="News" />
                            </StyledItemButton>
                        </StyledItem>
                        <StyledItem>
                            <StyledItemButton component={Link}
                                to={'/categories/trends'} >
                                <TrendsIcon className={s.svg} />
                                <StyledItemText primary="Trends" />
                            </StyledItemButton>
                        </StyledItem>
                        <StyledItem>
                            <StyledItemButton component={Link}
                                to={'/categories/movies'} >
                                <MoviesIcon className={s.svg} />
                                <StyledItemText primary="Movies" />
                            </StyledItemButton>
                        </StyledItem>
                    </StyledBox>
                </StyledContentBox>
            </List>
        </StyledMainBox>
    );


    return (
        <div>
            <React.Fragment key='left'>

                <Button disableRipple sx={{
                    p: 1, "&:hover": {
                        backgroundColor: "transparent",
                        height: 'inherit'
                    },
                    width: '5vw',
                    mr: '1%',
                    display: 'flex',
                    justifyContent: 'center'
                }} size="large" aria-label="menu"
                    onClick={toggleDrawer(true)}>
                    <BurgerIcon className={style.burgerSvg} />
                </Button>

                <Drawer
                    hideBackdrop
                    anchor='left'
                    open={left}
                    onClose={toggleDrawer(false)}>
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

let mapStateToProps = (state) => {
    return {
        tagsDisplay: state.ui.tagsDisplay
    }
};

export default connect(mapStateToProps,
    { toggleTagsDisplay, toggleBlur }
)(BurgerMenu);