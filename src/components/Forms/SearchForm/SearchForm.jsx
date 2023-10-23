import { Autocomplete, Stack, TextField, Divider, Typography, Box, Popper, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import style from './SearchForm.module.css';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { toggleSearchTextValue } from './../../../redux/ui-reducer';
import { IconButton, Button } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import InputAdornment from "@material-ui/core/InputAdornment";
//import SearchIcon from "@material-ui/icons/Search";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import { ReactComponent as MicIcon } from './../../../assets/mic_icon.svg';
import { ReactComponent as ActiveMic } from './../../../assets/active_mic.svg';
import { ReactComponent as SearchIcon } from './../../../assets/search_icon.svg';
import { ReactComponent as ClearSearchBtn } from './../../../assets/clear_search.svg';
import { makeStyles, createStyles} from '@mui/styles';
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputBase-sizeSmall": {
      padding: "2px"
    },
    "& .MuiAutocomplete-listbox": {
      background: theme.palette.background.default,
      "& li:nth-child(-n+2)": { color: theme.palette.primary.main },
      "& li:hover": {
        background: theme.palette.action.hover
      },
    },
  },
  textfield: {
    "& .MuiButtonBase-root.MuiAutocomplete-clearIndicator": {
      color: theme.palette.primary.main
    },
    "& .MuiInputBase-input.MuiAutocomplete-input": {
      color: theme.palette.secondary,
      fontSize: 18,
      '&::placeholder': {
        textAlign: 'center',
        marginLeft: '-70px'
      },
    },
  },
}));

const CustomPopper = (props) => {
  const classes = useStyles();
  return <Popper {...props} placement='bottom'
  className={classes.root} />
}

const SearchForm = (props) => {
  const [formDisplay, setFormDisplay] = useState('');
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between('mtMiddle', 'tablet'));
  const isMobileMatches = useMediaQuery(theme.breakpoints.between('mobile', 'mtMiddle'));
  const classes = useStyles();
  //const [value, setValue] = useState("");
  const [textValue, setTextValue] = useState('');
  const textInput = React.useRef(null);
  // let options = [
  //   'video', 'video games', 'video editing apps', 'vikeoke songs'
  // ];

  // const [options, setOptions] = useState([]);
  // useEffect(() => {
  //   fetch("")
  //     .then((response) => response.json())
  //     .then((options) => setOptions(options));
  // });

  const navigate = useNavigate();
  const onClickNavigate = () => {
    navigate(`/search/${textValue}`)
  };

  let options = props.searchOptions ? props.searchOptions : [];

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [isActiveSpeech, setActiveSpeech] = useState(null);
  useEffect(() => {
    if (isActiveSpeech) {
      SpeechRecognition.startListening();//{ language: 'uk-UA', continuous: true }
      
    } else if (isActiveSpeech === false) {
      props.toggleSearchTextValue(transcript);
      setTextValue(transcript);
      SpeechRecognition.stopListening();
      
      setActiveSpeech(null);
    }
  }, [isActiveSpeech]);


  let getInputEndAdornment = () => {
    if (!isMobileMatches) {
      return <Stack direction="row" p={0}>
        {isShowedClearBtn && <ClearSearchBtn className={style.searchInputBtn} 
        onClick={(e) => { setTextValue(''); showClearBtn(false); resetTranscript(); }} />}
        <Divider orientation="vertical" sx={{ mr: '8px' }} flexItem />
        <SearchIcon onClick={onClickNavigate} className={style.searchInputBtn} />
        {isActiveSpeech
        ? <ActiveMic className={style.searchInputBtn} onClick={() => { setActiveSpeech(false); }} />
        : <MicIcon className={style.searchInputBtn} 
        onClick={() => { 
          if (!browserSupportsSpeechRecognition) {
            alert('The browser does not support speech recognition');
            return;
          }
          setActiveSpeech(true); }} />
        }
        
      </Stack>;
    } else if (isMobileMatches && props.toShowMobileSearch) {//matches && props.toShowMobileSearch
      return <Stack direction="row" p={0}>
        {isShowedClearBtn && <ClearSearchBtn className={style.searchInputBtn} 
        onClick={() => { setTextValue(''); showClearBtn(false); resetTranscript(); }} /> }
        <Divider orientation="vertical" sx={{ mr: '8px' }} flexItem />
        <SearchIcon onClick={onClickNavigate} className={style.searchInputBtn} />
      </Stack>;
    } else {
      return null;
    }
  }

  const [isShowedClearBtn, showClearBtn] = useState(false);
  useEffect(() => {
    if (textValue != props.searchTextValue) {
      props.toggleSearchTextValue(textValue);
    }    

    if (textValue.length != 0) {
      showClearBtn(true);
    }
  }, [textValue]);


  useEffect(() => {
    setFormDisplay(props.displayForm);
  }, [props.displayForm]);

  return (
    <form >
      <Box direction="row" sx={{padding: 0, marginBottom: (props.toShowMobileSearch ? '10px' : 0),
      width: 'max-content', justifySelf: 'center', display: 'flex', alignItems: 'center'}}
      onClick={() => {
        if (!props.toShowMobileSearch && isMobileMatches) {
          setFormDisplay('none');
          props.toggleDrawMobileSearch(true);
        }
      }}
      style={{display: formDisplay}}
      >
        <Autocomplete
          forcePopupIcon={false}
          style={{width: (isMobileMatches) ? ((props.toShowMobileSearch) ? '314px' : '210px') : "31vw",
          marginLeft: (isMobileMatches) ? ((props.isAuth) ? '7px' : 0) : 0,
          marginRight: isMobileMatches ? 5 : 0,
          }}
          sx={{ width: "31vw", p: 0, m: 0, justifySelf: 'center' }}
          freeSolo
          disableClearable
          //PopperComponent={CustomPopper}
          options={options}
          filterOptions={(x) => x}
          getOptionLabel={(option) => option}
          autoHighlight
          renderOption={(props, option) => (
            <Box component="li" sx={{ background: 'white', color: '#1F99DE', display: 'flex', justifyContent: 'space-between' }} {...props}>
              {option} 
              {/* <CloseSharpIcon sx={{justifySelf: 'flex-end'}} /> */}
            </Box>
      )}
          noOptionsText='no option res'
          filterSelectedOptions={true}
          isOptionEqualToValue={(option, value) => option === value}
          ListboxProps={{ 
            style: { 
              maxHeight: '90px',
              background: 'white'
            } 
          }}
          inputValue={isActiveSpeech ? transcript : (props.searchTextValue ? props.searchTextValue : textValue)}
          onInputChange={(e) => {
            if (isActiveSpeech || transcript.length != 0) {
              setTextValue(transcript);
            } else {
              setTextValue((e.currentTarget.value) ? e.currentTarget.value : e.target.outerText);
            }
          }}
                    
          renderInput={(params) => 
          <TextField {...params} size="small"
          key='myTextField'
          inputRef={textInput}
          value={isActiveSpeech ? transcript : (props.searchTextValue ? props.searchTextValue : textValue)}
          InputProps={{
            ...params.InputProps,
            placeholder: "Search",
            endAdornment:  getInputEndAdornment(),
          }}/>}
        />

        <ActiveMic style={{display: ((isMobileMatches && isActiveSpeech) ? (!props.toShowMobileSearch ? '' : '') : 'none'), 
        marginRight: props.toShowMobileSearch ? '5px' : (props.isAuth ? '7px' : '10px') }} 
        className={style.micIcon + ' ' + style.searchInputBtn}
        onClick={() => { setActiveSpeech(false); }} />

        <MicIcon style={{display: ((isMobileMatches && !isActiveSpeech) ? (!props.toShowMobileSearch ? '' : '') : 'none'), 
        marginRight: props.toShowMobileSearch ? '5px' : (props.isAuth ? '7px' : '10px') }} 
        className={style.micIcon + ' ' + style.searchInputBtn}
        onClick={() => { 
          if (!browserSupportsSpeechRecognition) {
            alert('The browser does not support speech recognition');
            return;
          }
          setActiveSpeech(true); 
        }} />
        
      </Box>
    </form>
  );
}

let mapStateToProps = (state) => {
  return {
      searchTextValue: state.ui.searchTextValue
  };
};

export default connect(mapStateToProps,
      {
          toggleSearchTextValue,
      })
(SearchForm);