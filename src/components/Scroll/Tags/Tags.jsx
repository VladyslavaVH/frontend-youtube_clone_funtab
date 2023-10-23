import React, {useState, useEffect} from "react";
import { Box, Paper, Container, Avatar, Typography } from "@mui/material";
import { ReactComponent as ArrowRightChannel } from '../../../assets/arrow_right_channel.svg';
import { ReactComponent as ArrowLeftChannel } from '../../../assets/arrow_left_channel.svg';
import { styled } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
        "&::-webkit-scrollbar": {
            display: 'none',
        },
    },
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
    justifyContent: 'center',
    marginTop: '2px', 
    marginBottom: '2px', 
    marginRight: '8px',
    background: 'background.paper',
    minWidth: 'max-content',
    minHeight: 'max-content',
    maxHeight: '24px'
}));

const TagName = styled(Typography)(({theme}) => ({
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 400,
    margin: '7px'
}));

const StyledContainer = styled(Container)(({theme}) => ({
    width: '92vw', 
    background: theme.palette.grey.bg, 
    display: 'flex', 
    flexWrap: 'nowrap', 
    height: 'max-content'
}));

const Tags = (props) => {
    const classes = useStyles();
    const [isOverflown, setOverflown] = useState(false);
    const tagBox = React.createRef();
    useEffect(() => {
        let check = (tagBox.current.scrollWidth > tagBox.current.clientWidth) 
        && (props.tags.length >= 15);

        setOverflown(check);
    }, [tagBox]);

    return <StyledContainer maxWidth="xl" disableGutters>

       {isOverflown
       ?<ItemPaper elevation={0} sx={{marginRight: '0px', width: '24px' }} onClick={() => {tagBox.current.scrollLeft -= 300;}}>
           <ArrowLeftChannel style={{minWidth: "12px", width: "12px", height: "12px"}} />
       </ItemPaper>
       : null}

       <Box ref={tagBox} id="tagBox" 
       className={classes.root}
           width="inherit" height="max-content" 
           sx={{display: 'flex', flexWrap: 'nowrap', overflowX: 'scroll',
           marginLeft: '8px', marginRight: '8px' }}>
           {props.tags.length != 0
           ?props.tags.map((tag, i) => 
           <ItemPaper key={tag.id} elevation={0} sx={{marginRight: (i+1 == props.tags.length) ? '0px' : '8px' }}>
                <TagName>{tag.name}</TagName>
            </ItemPaper>)
            : null}
       </Box>

       {isOverflown
       ? <ItemPaper elevation={0} sx={{ width: '24px'}} onClick={() => {tagBox.current.scrollLeft += 300;}}>
           <ArrowRightChannel style={{minWidth: "12px", width: "12px", height: "12px"}} />
       </ItemPaper>
       : null}
   </StyledContainer>
};

export default Tags;