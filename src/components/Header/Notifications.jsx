import React from "react";
import { Popover, IconButton, Badge, Stack, Typography} from '@mui/material';
import { ReactComponent as Bell } from '../../assets/bell.svg';
import { ReactComponent as Settings } from '../../assets/BurgerSubIcons/settings.svg';
import { ReactComponent as EmptyNotifications } from '../../assets/empty/empty_notification.svg';
import { Box } from '@mui/material';

const Notifications = (props) => {
    const[anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return <>
        <IconButton disableRipple style={{ width: 'max-content', minWidth: 0 }} sx={{ "&:hover": { backgroundColor: "transparent" }, p: 0, m: 0 }}
            onClick={handleClick}>
            <Badge badgeContent={props.notifications.length}
                color="info" overlap="circular" variant="dot">
                <Bell />
            </Badge>
        </IconButton>
        {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
            Open Popover
        </Button> */}

        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
            }}
            sx={{width: 260, height: 300}}
        >
            <Stack direction='column' 
            sx={{width: 'inherit', height: 'max-content', p: '15px'}}>
                <Stack direction='row' justifyContent='space-between'>
                    <Typography>Go to settings</Typography>
                    <Settings />
                </Stack>
                <EmptyNotifications />
                <Typography textAlign='center'>You don't have any notifications yet</Typography>
            </Stack>
        </Popover>
    </>
}

export default Notifications;