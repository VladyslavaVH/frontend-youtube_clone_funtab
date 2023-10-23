import style from "./Header.module.css";
import SearchForm from "../Forms/SearchForm/SearchForm";
import { ReactComponent as Logo } from '../../assets/logo.svg';

import { toggleDrawMobileSearch, toggleTagsDisplay, toggleModalBlur } from './../../redux/ui-reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import React, { useEffect, useState } from 'react';

import {
    setAuthUserData, getUnAuthTags, getAuthTags,
    getAuthHeaderData,
    setAuthData
} from './../../redux/auth-reducer';

import { AppBar, Avatar, AvatarGroup, Badge, Button, IconButton, Stack, Container, Toolbar, SvgIcon, Typography, Box, useMediaQuery } from "@mui/material";
import { ReactComponent as Profile } from './../../assets/profile.svg';
import { ReactComponent as Bell } from './../../assets/bell.svg';
import { ReactComponent as PlusIcon } from './../../assets/plus_icon.svg';
import { ReactComponent as BurgerIcon } from './../../assets/burger_icon.svg';
import { ReactComponent as JustLogo } from './../../assets/just_logo.svg';
import { useTheme } from "@mui/material/styles";
import Tags from "../Scroll/Tags/Tags";
import AccountMenu from './AccountMenu/AccountMenu';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import MyModal from '../Customs/MyModal';
import { useNavigate } from 'react-router-dom';
import Notification from './Notifications';

function Header(props) {
    const navigate = useNavigate();
    const channelImgDir = '../ServerData/ChannelsImage/';
    const theme = useTheme();
    const [showTags, setShowTags] = useState(true);

    const isLaptop = useMediaQuery(theme.breakpoints.between('mtMiddle', 1502));
    const isMobileMatches = useMediaQuery(theme.breakpoints.between('mobile', 'mtMiddle'));

    const [showHederMobileSearch, setToShowHederMobileSearch] = useState(false);

    useEffect(() => {
        setToShowHederMobileSearch(props.toShowMobileSearch);
    }, [props.toShowMobileSearch]);

    useEffect(() => {
        if (!isMobileMatches) {
            props.toggleDrawMobileSearch(false);
        }

    }, []);

    useEffect(() => {
        if (localStorage.getItem('email') && (!props.imageUrl)) {
            const email = localStorage.getItem('email');
            const fullName = localStorage.getItem('fullName');
            const icon = localStorage.getItem('icon');
            const lastName = localStorage.getItem('lastName');
            const firstName = localStorage.getItem('firstName');
            const googleId = localStorage.getItem('googleId');
            const imageUrl = localStorage.getItem('imageUrl');

            props.setAuthUserData(
                email, fullName, icon, lastName, firstName, googleId, imageUrl
            );
        }
    });

    useEffect(() => {
        //if (props.isAuth) {
        if (localStorage.getItem('jwt')) {
            props.setAuthData();
        } else {
            props.getUnAuthTags();
        }

    }, [props.isAuth]);

    const onClickCheck = () => {
        if ((window.location.href == `http://${window.location.host}/`)
            || (window.location.href == `https://${window.location.host}/`)
            || window.location.pathname.includes('/search/')) {
            setShowTags(true);
            props.toggleTagsDisplay(true);
        } else {
            setShowTags(false);
            props.toggleTagsDisplay(false);
        }
    }

    const navigateChannel = (id) => {
        navigate(`/channel/${id}`);
    }

    useEffect(onClickCheck, [props.searchTextValue]);

    return <AppBar onClick={onClickCheck}
        className={style.appBar} position="fixed" sx={{
            bgcolor: '#fdfdfd', p: 0, boxShadow: 0
        }} >
        <div id="blackout-block" style={{ marginTop: isLaptop ? '9vh' : '6vh' }}></div>
        <Stack direction="column" style={{ 'height': 'max-content' }}>
            <Toolbar variant="dense"
                style={{ padding: 0, marginTop: 5, marginBottom: 5, minHeight: 'inherit', maxHeight: 'inherit', height: 'inherit' }}
                sx={{
                    display: 'flex', justifyContent: 'space-between',
                    alignContent: 'center'
                }} >

                {!isMobileMatches
                    ? <Box display="flex"
                        justifyContent="space-between" alignItems="center">

                        <BurgerMenu />

                        <Button disableRipple sx={{ "&:hover": { backgroundColor: "transparent" } }} href="/" size="large" >
                            <Logo className={style.logoSvg} />
                        </Button>
                    </Box>
                    : (!showHederMobileSearch
                        ? <Button disableRipple sx={{ minWidth: 0, "&:hover": { backgroundColor: "transparent" }, p: 0, m: 0 }} href="/" size="small" >
                            <JustLogo className={style.justLogoSvg} />
                        </Button>
                        : <Button disableRipple sx={{ "&:hover": { backgroundColor: "transparent" } }} href="/" size="large" >
                            <Logo className={style.logoSvg} />
                        </Button>)
                }

                <SearchForm displayForm={(!props.toShowMobileSearch) ? '' : 'none'} isAuth={props.isAuth} toShowMobileSearch={showHederMobileSearch} toggleDrawMobileSearch={props.toggleDrawMobileSearch} searchOptions={props.searchOptions ? props.searchOptions : null} />

                {props.isAuth
                    ? <Stack direction="row" spacing={1} sx={{ marginRight: 2 }}
                        display="flex"
                        alignItems="center" justifyContent="center" alignSelf="center">

                        {!isMobileMatches && <PlusIcon onClick={() => navigate('/create_channel')} className={style.endSvg + ' ' + style.plusSvg} />}

                        <Notification notifications={props.notifications} />

                        <AvatarGroup max={5} spacing={1} >
                            {!isMobileMatches && props.myChannels.map((channel) =>
                                channel.id != props.id
                                ? <Avatar key={channel.id} alt="user" 
                                src={channel.imageUrl ? channel.imageUrl : `${channelImgDir}${channel.icon}`}
                                sx={{ minWidth: '35px', minHeight: '35px', width: '35px', 
                                height: '35px', mr: '2px', cursor: 'pointer', alignSelf: 'center' }}
                                onClick={() => navigateChannel(channel.id)} />
                                : undefined)
                            }

                            <AccountMenu key={props.id} id={props.id}
                            icon={props.imageUrl ? props.imageUrl : `${channelImgDir}${props.icon}`} />
                        </AvatarGroup>
                    </Stack>

                    : <MyModal />//sign in
                }

            </Toolbar>

            <Box style={{ display: ((isMobileMatches && props.toShowMobileSearch) ? '' : 'none') }} sx={{ width: 'inherit', display: 'flex', justifyContent: 'center' }}>
                <SearchForm displayForm={(isMobileMatches && props.toShowMobileSearch) ? '' : 'none'} isAuth={props.isAuth} toShowMobileSearch={props.toShowMobileSearch} toggleDrawMobileSearch={props.toggleDrawMobileSearch} searchOptions={props.searchOptions ? props.searchOptions : null} />
            </Box>
        </Stack>

        {(showTags)
            ? <div id="tagsContainer" >
                <Stack direction="column" sx={{ width: '100vw', height: 'max-content', pt: '1vh', pb: '1vh', backgroundColor: 'grey.bg' }}>

                    <Tags tags={props.tags} />

                </Stack>
            </div>
            : null}

    </AppBar>;
}

let mapStateToProps = (state) => {
    return {
        isModalActive: state.modal.isModalActive,
        isLogClose: state.modal.isLogClose,
        isAuth: state.auth.isAuth,
        imageUrl: state.auth.imageUrl,
        icon: state.auth.icon,
        name: state.auth.name,
        toShowMobileSearch: state.ui.toShowMobileSearch,
        searchTextValue: state.ui.searchTextValue,
        tags: state.auth.tags,
        subs: state.auth.subs,
        notifications: state.auth.notifications,
        searchOptions: state.auth.searchOptions,
        videos: state.auth.videos,
        blueChannels: state.auth.blueChannels,
        myChannels: state.auth.myChannels,
        tagsDisplay: state.ui.tagsDisplay,
        searchTextValue: state.ui.searchTextValue
    };
};

export default compose(
    connect(mapStateToProps,
        {
            setAuthUserData, toggleDrawMobileSearch,
            getUnAuthTags, getAuthTags, getAuthHeaderData,
            toggleTagsDisplay, toggleModalBlur,

            setAuthData
        })
)(Header);