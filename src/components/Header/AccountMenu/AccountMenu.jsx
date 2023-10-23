import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import { ReactComponent as UploadVideoIcon } from '../../../assets/upload_video_icon.svg';
import { ReactComponent as ThemeIcon } from '../../../assets/theme_icon.svg';
import { ReactComponent as SwitchAccountIcon } from '../../../assets/switch_account_icon.svg';
import { ReactComponent as LanguageIcon } from '../../../assets/language_icon.svg';
import { ReactComponent as CountryIcon } from '../../../assets/country_icon.svg';
import { ReactComponent as LogoutIcon } from '../../../assets/logout_icon.svg';
import { ReactComponent as SettingsIcon } from '../../../assets/settings_icon.svg';
import { styled } from '@mui/material/styles';
import ThemeMenu from './SubMenu/ThemeMenu';

const StyledMenu = styled(Menu)(({theme}) => ({
    
}));

const StyledMenuItem = styled(MenuItem)(({theme}) => ({
    "&:hover": {
        cursor: "pointer",
        backgroundColor: theme.palette.action.listHover
    },
    borderRadius: '3px',
    margin: '0px 9px',
    padding: '9px 0px',
    minHeight: 0,
    height: 'max-content',

}));

const StyledListItemIcon = styled(ListItemIcon)(({theme}) => ({
    marginLeft: '9px'
}));

const StyledTypography = styled(Typography)(({theme}) => ({
    fontFamily: 'Roboto',
    fontSize: '18px',
    fontWeight: 400
}));

const AccountMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Avatar alt="user" src={props.icon}
        sx={{ minWidth: '55px', minHeight: '55px', width: '55px', height: '55px', mr: '5px', cursor: 'pointer' }}
        onClick={handleClick}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}/>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            pt: '15px',
            pb: '15px',
            '& .MuiAvatar-root': {
              width: 27,
              height: 27,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} >
            
        <StyledMenuItem onClick={handleClose}>
          <StyledListItemIcon>
            <UploadVideoIcon fontSize="small" />
          </StyledListItemIcon>
          <StyledTypography>Upload video</StyledTypography>
        </StyledMenuItem>

        <ThemeMenu />

        <StyledMenuItem>
            <StyledListItemIcon>
                <SwitchAccountIcon fontSize="small" />
            </StyledListItemIcon>
            <StyledTypography>
                Switch account
            </StyledTypography>
        </StyledMenuItem>

        <StyledMenuItem>
            <StyledListItemIcon>
                <LanguageIcon fontSize="small" />
            </StyledListItemIcon>
            <StyledTypography>
                {'Language: English (US)'}
            </StyledTypography>
        </StyledMenuItem>

        <StyledMenuItem >
            <StyledListItemIcon>
                <CountryIcon fontSize="small" />
            </StyledListItemIcon>
            <StyledTypography>
                Country: Ukraine
            </StyledTypography>
        </StyledMenuItem>

        <StyledMenuItem onClick={handleClose}>
          <StyledListItemIcon>
            <LogoutIcon fontSize="small" />
          </StyledListItemIcon>
          <StyledTypography>Logout</StyledTypography>
        </StyledMenuItem>

        <StyledMenuItem onClick={handleClose}>
            <StyledListItemIcon>
                <SettingsIcon fontSize="small" />
            </StyledListItemIcon>
            <StyledTypography>
                Settings
            </StyledTypography>
        </StyledMenuItem>

      </Menu>
    </>
  );
}

export default AccountMenu;