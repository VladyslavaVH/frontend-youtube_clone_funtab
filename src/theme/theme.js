import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      mtMiddle: 600,
      tablet: 922,
      //tablet: 768,//768 , 1096
      laptop: 1500,//1270, 1500 , 1750
      desktop: 1924,
      /*xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920*/
    }
  },
  components: {
    MuiToolbar: {
        styleOverrides: {
            dense: {
                height: 70,
                minHeight: 70
            }
        }
    },
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          '&[aria-selected="true"]': {
            //backgroundColor: theme.palette.action.hover,
          },
          '&[data-focus="true"]': {
            //backgroundColor: theme.palette.action.hover,
          },
          '&:active': {
            //backgroundColor: theme.palette.action.hover,
          },
          '&[aria-disabled="true"]': {
            //opacity: theme.palette.text.secondary,
            pointerEvents: 'none',
          },
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          // '.MuiMenu-paper::-webkit-scrollbar': {
          //   //display: 'none'
          //   width: '10px',
          //   marginLeft: '15px',
          //   //background: 'lightblue',
          //   '&::-webkit-scrollbar-thumb': {
          //     backgroundColor: 'red'
          //   }
          // },
          // '.MuiMenu-paper::-webkit-scrollbar-thumb': {
          //   backgroundColor: 'blue'
          // }
        },
      }
    }
},
  palette: {
    mode: "light",
    primary: {
      main: '#1F99DE'
    },
    background: {
      paper: "white",
      //paper: "#f2f2f2",
      default: '#FDFDFD'
    },
    warning: {
        main: '#F6803E',
        hover: '#DA5F19'
    },
    info: {
      main: '#F7803E',   
    },
    action: {
      hover: '#C4DFFF',
      buttonHover: '#0280C7'
    },
    grey: {
      bg: '#E9ECF1',
      textField: '#E9ECF1',
      placeholder: '#969696'
    },
    text: {
      primary: "#262A39",
      secondary: "#969696",
      likeBtn: '#262A39' 
    },
    divider: '#F1F1F1'
  },
  typography: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    //fontSize: '18px',
    fontWeight: 400,
    subtitle1: {
      //fontSize: '18px',//1.125rem
      fontWeight: 400,
      lineHeight: '21px',//1.3125rem
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: '2',
      WebkitBoxOrient: 'vertical',
    },
    subtitle2: {
      //fontSize: '14px',//0.875rem
      lineHeight: '16px',//1rem
      color: "#969696",
    },
  },
  
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#222",
    },
    text: {
      primary: "#fff",
    },
  },
});
