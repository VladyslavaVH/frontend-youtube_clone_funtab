import React, { createRef, useEffect } from "react";
import { Box, Tab, Tabs, TabPanel, Popover, Button, Container, Stack, Paper, Typography, Avatar, Grid, CssBaseline } from "@mui/material";
import bg from '../../assets/default/channel_bg.svg';
import avatar from '../../assets/default/avatar1.svg';
import addVideo from '../../assets/big_upload_video.svg';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { API } from '../../api/api';
import BasicTabs from './TabPanel';

const StyledTypography = styled(Typography)(({ theme }) => ({
  margin: 8,
  marginRight: 15,
  '&:hover': {
    background: theme.palette.action.listHover,
    borderRadius: 3,
    cursor: 'pointer',
  },
  padding: 5
  //   [theme.breakpoints.between('mobile', 'laptop')]: {
  //     minWidth: '343px',
  //     marginTop: '16px'
  // },
}));//StyledBoxAvatar

const StyledBoxAvatar = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginTop: '-20px',
  flexGrow: 4,
  [theme.breakpoints.between('mobile', 'laptop')]: {
    flexGrow: 7
  },
}));//StyledAddVideoBox

const StyledAddVideoBox = styled(Box)(({ theme }) => ({
  margin: '5vh',
  marginLeft: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '20vw',
  height: '30vh',
  background: theme.palette.background.paper,
  [theme.breakpoints.between('mobile', 'laptop')]: {
    width: '30vw',
    height: '45vh',
  },
}));


const Channel = (props) => {
  const channelImgDir = '../ServerData/ChannelsImage/';
  const {channelId} = useParams();
  let channelImg;
  let channel;

  useEffect(() => {
    //channel = API.getChannelById(channelId);

  }, []);

  const addVideoServer = () => {

  }

  return <Container maxWidth='xl' >
    <Box
      component="img"
      sx={{
        m: 0,
        p: 0,
        objectFit: 'cover',
        height: '30vh',
        width: 'inherit',
        maxHeight: { xl: 300 },
        maxWidth: { xl: 1696 },
      }}
      alt="default background"
      src={'../ServerData/BgChannel/bg.svg'}
    />

    {/* <Box sx={{
      background: 'white', width: 'inherit', maxHeight: 47,
      display: 'flex', alignItems: 'center'
    }}>
      <Box style={{ display: 'flex', flexGrow: 2 }}>
        <StyledTypography>My videos</StyledTypography>
        <StyledTypography>My playlists</StyledTypography>
        <StyledTypography>Info</StyledTypography>
      </Box>
      <StyledBoxAvatar >
        <Avatar src={
          `${channelImgDir}${'smile.svg'}`
        }
          sx={{
            width: 100, height: 100,
            alignSelf: 'flex-end', justifySelf: 'center',
          }} />
          <Typography sx={{alignSelf: 'center', mt: 5, ml: '10px'}}>
            {'name}
          </Typography>
      </StyledBoxAvatar>

    </Box>
    <StyledAddVideoBox>
      <img src={addVideo} />
      <Button sx={{ mt: '15px' }} variant="contained" disableRipple disableTouchRipple onClick={addVideoServer}>
        <Typography sx={{ fontSize: 18, fontWeight: 400, fontFamily: 'Roboto', }}>Upload video</Typography>
      </Button>
    </StyledAddVideoBox> */}

    <BasicTabs />


  </Container>
}

export default Channel;