import React, { useState, useEffect } from "react";
import { Popover, AppBar, Menu, MenuItem, Paper, Avatar, Typography, Stack, Box } from "@mui/material";
import { ReactComponent as BurgerMenu } from '../../../assets/burger_icon.svg';
import { styled } from "@mui/styles";

const ItemPaper = styled(Paper)(({ theme }) => ({
    "&:hover": {
        cursor: "pointer",
    },
    border: "2px solid transparent",
    borderRadius: '5px',
    borderColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    padding: '0px 13px',
    marginTop: '2px',
    marginBottom: '2px',
    marginRight: '15px',
    backgroundColor: theme.palette.background.paper,
    minWidth: 'max-content',
    minHeight: '60px',
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
    maxHeight: '409px',
    width: '302px',
    //position: 'relative',
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    "&:hover": {
        cursor: "pointer",
        backgroundColor: theme.palette.action.hover
    },
    backgroundColor: theme.palette.background.paper
}));

const ChannelAvatar = styled(Avatar)(({ theme }) => ({
    ":hover": {
        cursor: "pointer"
    },
    marginRight: '15px',
}));

const ChannelName = styled(Typography)(({ theme }) => ({
    fontFamily: 'Roboto',
    fontSize: '18px',
    fontWeight: 400,
}));

const MenuChannels = (props) => {
    const channelsImageDir = '../ServerData/ChannelsImage/';
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const header = document.getElementsByTagName('header')[0].style;
    const main = document.getElementsByClassName('main')[0].style;
    const channelContainer = document.getElementById('channelContainer').style;
    const tagsContainer = document.getElementById('tagsContainer').style;
    const blackoutBlock = document.getElementById('blackout-block').style;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        tagsContainer.filter = main.filter = 'blur(3px)';
        channelContainer.filter = 'blur(3px)';
        blackoutBlock.opacity = 1;
    };

    const handleClose = () => {
        setAnchorEl(null);
        tagsContainer.filter = main.filter = 'blur(0px)';
        channelContainer.filter = 'blur(0px)';
        blackoutBlock.opacity = 0;
    };

    return (
        <div>
            <ItemPaper elevation={0} style={{ marginRight: 0 }}
                id="burger-menu-button"
                aria-controls={open ? 'channels-popover' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>

                <BurgerMenu />
            </ItemPaper>

            <StyledMenu
                id="channels-menu"
                aria-labelledby="burger-menu-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}>

                <StyledMenuItem  disableTouchRipple
                style={{
                    top: 0,
                    position: "sticky",
                    background: "white",
                    zIndex: 100,
                }}>
                    <BurgerMenu style={{margin: 10}} />
                    <Typography sx={{fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 18}}>
                        Subscriptions
                    </Typography>
                </StyledMenuItem>

                {props.subscriptions.map((sub) => {

                    return <StyledMenuItem key={sub.id} onClick={handleClose}>
                        <ChannelAvatar src={`${channelsImageDir}${sub.channelImg}`} />
                        <ChannelName>{sub.channelName}</ChannelName>
                    </StyledMenuItem>;
                })}
            </StyledMenu>
        </div>
    );
};

export default MenuChannels;