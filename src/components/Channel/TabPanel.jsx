import * as React from 'react';
import PropTypes from 'prop-types';
import { Button, Tabs, Tab, Typography, Box, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import addVideo from '../../assets/big_upload_video.svg';
import VideoCard from './VideoCard';
import UploadCard from './UploadCard';
import { makeStyles } from '@material-ui/core/styles';
import PlayListCard from './PlayListCard';

const StyledBoxAvatar = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifySelf: 'center',
    alignSelf: 'center',
    width: 'max-content',
    marginTop: '-50px',
    flexGrow: 4,
    // [theme.breakpoints.between('mobile', 'laptop')]: {
    //   flexGrow: 7
    // },
}));//StyledAddVideoBox

function TabPanel(props) {
    const { children, justifyContent, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{mt: '2.5%', display: 'flex', 
                justifyContent: justifyContent, flexWrap: 'wrap'}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const posterDir = '../ServerData/Posters/';
    const channelImgDir = '../ServerData/ChannelsImage/';
    const videosDir = '../ServerData/Videos/';
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const tabStyle = {
        textTransform: 'none',
        fontWeight: 400,
        fontSize: 18,
        color: 'text.primary',
        p: '5px',
        borderRadius: '3px',
        height: 'max-content',
        minHeight: 'max-content',
        mr: '20px'
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{
                bgcolor: 'background.paper', display: 'flex', maxHeight: '48.5px',
                p: 0, m: 0
            }}>
                <Tabs indicatorColor=''
                    sx={{
                        flexGrow: 2,
                        minHeight: 'max-content', p: '8px',
                        "& .MuiTab-root.Mui-selected": {
                            backgroundColor: 'action.hover',
                            color: 'text.primary',
                            textTransform: 'none',
                            fontWeight: 400,
                            fontSize: 18,
                            p: '5px',
                            borderRadius: '3px'
                        }
                    }}
                    value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab sx={{ ...tabStyle }} disableTouchRipple disableRipple disableFocusRipple label="My videos" {...a11yProps(0)} />
                    <Tab sx={{ ...tabStyle }} disableTouchRipple disableRipple disableFocusRipple label="My playlist" {...a11yProps(1)} />
                    <Tab sx={{ ...tabStyle }} disableTouchRipple disableRipple disableFocusRipple label="Info" {...a11yProps(2)} />
                </Tabs>

                <StyledBoxAvatar >
                    <Avatar src={`${channelImgDir}${'smile.svg'}`}
                        sx={{
                            '& img': { objectFit: 'none', maxWidth: '130px', maxHeight: '130px', minWidth: '130px', minHeight: '130px', width: '130px', height: '130px' },
                            width: '100px', height: '100px',
                            alignSelf: 'flex-end', justifySelf: 'center',
                        }} />
                    <Typography sx={{ alignSelf: 'center', mt: '50px', ml: '10px' }}>
                        {'Name'}
                    </Typography>
                </StyledBoxAvatar>

            </Box>

            {/*My videos */}
            <TabPanel justifyContent={true ? 'start' : 'space-between'} value={value} index={0}>
                <UploadCard marginRight={true ? '2.5%' : 0} />

                <VideoCard 
                marginRight={true ? '2.5%' : 0}
                isBlue={false}
                id={'card.id'}
                key={'card.id'}
                video={`${videosDir}${'Avatar_The_Way_of_Water_Official_Teaser_Trailer.mp4'}`}
                //videoPoster={card.videoPoster ? `${posterDir}${card.videoPoster}` : null}
                videoPoster={true ? `${posterDir}${'1.jpg'}` : null}
                videoName={'Avatar_The_Way_of_Water_Official_Teaser_Trailer.mp4'}
                channelImg={`${channelImgDir}${'bird.svg'}`}
                channelName={'Bird'}
                views={'10 views'}
                likes={'15 likes'}
                lastVisit={'1 day ago'}/>
                <VideoCard 
                marginRight={true ? '2.5%' : 0}
                isBlue={false}
                id={'card.id'}
                key={'card.id'}
                video={`${videosDir}${'Avatar_The_Way_of_Water_Official_Teaser_Trailer.mp4'}`}
                //videoPoster={card.videoPoster ? `${posterDir}${card.videoPoster}` : null}
                videoPoster={true ? `${posterDir}${'1.jpg'}` : null}
                videoName={'Avatar_The_Way_of_Water_Official_Teaser_Trailer.mp4'}
                channelImg={`${channelImgDir}${'bird.svg'}`}
                channelName={'Bird'}
                views={'10 views'}
                likes={'15 likes'}
                lastVisit={'1 day ago'}/>
            </TabPanel>

            {/*My playlists */}
            <TabPanel justifyContent={false ? 'start' : 'space-between'} value={value} index={1}>
                <PlayListCard 
                marginRight={false ? '2.5%' : 0}
                //isBlue={false}
                id={'card.id'}
                key={'card.id'}
                video={`${videosDir}${'Avatar_The_Way_of_Water_Official_Teaser_Trailer.mp4'}`}
                //videoPoster={card.videoPoster ? `${posterDir}${card.videoPoster}` : null}
                videoPoster={true ? `${posterDir}${'1.jpg'}` : null}
                videoName={'Avatar_The_Way_of_Water_Official_Teaser_Trailer.mp4'}
                channelImg={`${channelImgDir}${'bird.svg'}`}
                channelName={'Bird'}
                views={'10 views'}
                likes={'15 likes'}
                lastVisit={'1 day ago'}/>

                <PlayListCard 
                marginRight={false ? '2.5%' : 0}
                //isBlue={false}
                id={'card.id'}
                key={'card.id'}
                video={`${videosDir}${'Avatar_The_Way_of_Water_Official_Teaser_Trailer.mp4'}`}
                //videoPoster={card.videoPoster ? `${posterDir}${card.videoPoster}` : null}
                videoPoster={true ? `${posterDir}${'1.jpg'}` : null}
                videoName={'Avatar_The_Way_of_Water_Official_Teaser_Trailer.mp4'}
                channelImg={`${channelImgDir}${'bird.svg'}`}
                channelName={'Bird'}
                views={'10 views'}
                likes={'15 likes'}
                lastVisit={'1 day ago'}/>
                
                <PlayListCard 
                marginRight={false ? '2.5%' : 0}
                //isBlue={false}
                id={'card.id'}
                key={'card.id'}
                video={`${videosDir}${'Avatar_The_Way_of_Water_Official_Teaser_Trailer.mp4'}`}
                //videoPoster={card.videoPoster ? `${posterDir}${card.videoPoster}` : null}
                videoPoster={true ? `${posterDir}${'1.jpg'}` : null}
                videoName={'Avatar_The_Way_of_Water_Official_Teaser_Trailer.mp4'}
                channelImg={`${channelImgDir}${'bird.svg'}`}
                channelName={'Bird'}
                views={'10 views'}
                likes={'15 likes'}
                lastVisit={'1 day ago'}/>
            </TabPanel>

            {/*Info */}
            <TabPanel value={value} index={2}>
                Info
            </TabPanel>
        </Box>
    );
}
