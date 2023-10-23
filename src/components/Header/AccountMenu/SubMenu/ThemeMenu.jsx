import React, { useState, useEffect } from "react";
import { Menu, MenuItem, Paper, Typography, ListItemIcon} from "@mui/material";
import { ReactComponent as ThemeIcon } from '../../../../assets/theme_icon.svg';
import { styled } from "@mui/styles";

const StyledMenu = styled(Menu)(({theme}) => ({
    padding: 0,

}));

const StyledMenuItem = styled(MenuItem)(({theme}) => ({
    "&:hover": {
        cursor: "pointer",
        //backgroundColor: theme.palette.action.listHover
        backgroundColor: '#C4DFFF'
    },
    borderRadius: '3px',
    margin: 0,
    padding: 0,
    minHeight: 0,
    height: 'max-content',
    
}));

const ItemText = styled(Typography)(({theme}) => ({
    fontFamily: 'Roboto',
    fontSize: '18px',
    fontWeight: 400,
}));

const ThemeMenu = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget); 
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <StyledMenuItem
                id="theme-menu-button"
                aria-controls={open ? 'mode-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>

                <ListItemIcon>
                    <ThemeIcon fontSize="small" />
                </ListItemIcon>
                <ItemText>
                    Theme: Light
                </ItemText>
            </StyledMenuItem>

            <StyledMenu
                id="mode-menu"
                aria-labelledby="theme-menu-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}

                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}>

                <StyledMenuItem sx={{padding: '6px', minHeight: 0}} onClick={handleClose}>
                    <ItemText>Light</ItemText>
                </StyledMenuItem>

                <StyledMenuItem sx={{padding: '6px', minHeight: 0}} onClick={handleClose}>
                    <ItemText>Dark</ItemText>
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
};

export default ThemeMenu;