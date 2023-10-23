import React, {useState, useEffect} from "react";
import { Box, Paper, Container, Avatar, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as ArrowRightChannel } from '../../../assets/arrow_right_channel.svg';
import { ReactComponent as ArrowLeftChannel } from '../../../assets/arrow_left_channel.svg';
import { styled } from '@mui/material/styles';
import MenuChannels from "./MenuChannels";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        "&::-webkit-scrollbar": {
            display: 'none',
        },
        // "&::-webkit-scrollbar-track": {
        //   boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
        // },
        // "&::-webkit-scrollbar-thumb": {
        //   backgroundColor: "darkgrey",
        //   outline: `1px solid slategrey`,
        // },
    },
}));

const ArrowPaper = styled(Paper)(({theme}) => ({
    ":hover": {
        cursor: "pointer",
    },
    display: 'flex', 
    alignItems: "center", 
    marginTop: '2px', 
    marginBottom: '2px',
    background: 'white', 
    minWidth: '0px', 
    height: '60px'
}));

const ItemPaper = styled(Paper)(({theme}) => ({
    ":hover": {
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
    background: 'white',
    minWidth: 'max-content',
    minHeight: '60px',
}));

const ChannelAvatar = styled(Avatar)(({theme}) => ({
    ":hover": {
        cursor: "pointer"
    },
    marginRight: '15px',
}));

const ChannelName = styled(Typography)(({theme}) => ({
    fontFamily: 'Roboto',
    fontSize: '18px',
    fontWeight: 400,
}));

const SubChannels = (props) => {
    const channelsImageDir = '../ServerData/ChannelsImage/';
    const theme = useTheme();
    const isLaptop = useMediaQuery(theme.breakpoints.between('mtMiddle', 1502));
    const classes = useStyles();
    let isBlue = false;
    const [isOverflown, setOverflown] = useState(false);
    const box = React.createRef();
    useEffect(() => {
        setOverflown(box.current.scrollWidth > box.current.clientWidth);
    }, [box]);

    return <Container 
     sx={{ width: '88vw', marginLeft: '5vw', marginRight: '5vw', display: 'flex', flexWrap: 'nowrap', marginTop: '1%', height: 'max-content'}}
     maxWidth="md" className="channelsContainer" disableGutters>

        {isOverflown
        ?<ArrowPaper elevation={0} sx={{marginRight: '15px', width: '24px' }} onClick={() => {box.current.scrollLeft -= 300;}}>
            <ArrowLeftChannel style={{minWidth: "24px"}} />
        </ArrowPaper>
        : null}

        {isOverflown
        ? <MenuChannels subscriptions={props.subscriptions} />
        : null}

        <Box ref={box} id="channelBox" className={classes.root}
            width="81vw" height="max-content" sx={{marginLeft: isOverflown ? '15px' : 0, marginRight: '15px',
             display: 'flex', flexWrap: 'nowrap', overflowX: 'scroll' }}>
            {props.subscriptions.map((sub, i) =>{
                isBlue = false;
                // for (const b of props.blueChannels) {
                //     if (sub.channelName == b) {
                //         isBlue = true;
                //     }
                // }
                
                return <ItemPaper key={sub.id} elevation={0} sx={{marginRight: (i+1 == props.subscriptions.length) ? '0px' : '15px',
                    borderColor: isBlue ? 'primary.main' : 'transparent'}}>
                    <ChannelAvatar src={sub.imageUrl ? sub.imageUrl : `${channelsImageDir}${sub.icon}`} />
                    <ChannelName>{sub.name}</ChannelName>
                </ItemPaper>;})}
        </Box>

        {isOverflown
        ? <ArrowPaper elevation={0} sx={{width: '24px'}} onClick={() => {box.current.scrollLeft += 300;}}>
            <ArrowRightChannel style={{minWidth: "24px"}} />
        </ArrowPaper>
        : null}
    </Container>;
};

export default SubChannels;