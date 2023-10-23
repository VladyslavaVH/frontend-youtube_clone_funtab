import React, { useEffect, useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import blue_pattern from '../../assets/patterns/blue_pattern.png';
import blue_pattern_opacity from '../../assets/patterns/blue_pattern_opacity.png';

const PageNotFound404 = (props) => {

    useEffect(() => {

    });

    return <Container maxWidth='xl' 
    sx={{background: `url(${blue_pattern_opacity}) repeat`, backgroundColor: '#E9ECF1', backgroundSize: '290px',
    width: '100vw', height: '100vh', mt: '-9vh', ml: '-5vw'}}>

        <Box sx={{pt: '17vh', pl: '5vw'}}>
            <Typography sx={{fontSize: 36, fontWeight: 700, color: 'warning.main'}}>404</Typography>
            <Typography sx={{fontSize: 36, fontWeight: 700}}>Oooops!</Typography>
            <Typography sx={{fontSize: 36, fontWeight: 700}}>Page not found</Typography>
            <Typography sx={{fontSize: 18, fontWeight: 400}}>The video you are looking for has been deleted</Typography>
        </Box>

    </Container>
}

export default PageNotFound404;