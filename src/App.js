import React, {useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HeaderContainer from "./components/Header/HeaderContainer";
import Main from "./components/Main/Main";
import Registration from "./components/Forms/Registration/Registration";
import History from "./components/BurgerMenu/History/History";
import Settings from "./components/BurgerMenu/Settings/Settings";
import LikedVideos from './components/BurgerMenu/LikedVideos/LikedVideos';
import WatchLater from './components/BurgerMenu/WatchLater/WatchLater';
import Category from "./components/BurgerMenu/Categories/Category";
import { useTheme } from '@mui/material/styles';
import { Typography, useMediaQuery } from "@mui/material";
import { makeStyles} from '@mui/styles';
import SearchPage from './components/Header/SearchPage';
import Channel from "./components/Channel/Channel";
import { useSelector } from "react-redux";
import OpenVideo from "./components/OpenVideo/OpenVideo";
import CreateChannel from "./components/CreateChannel/CreateChannel";
import PageNotFound404 from "./components/404/404";

function App() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.between(0, 1600));
  const showTagsStore = useSelector((state) => state.ui.tagsDisplay);
  const blur = useSelector((state) => state.ui.blur);
  const modalBlur = useSelector((state) => state.ui.modalBlur);

  useEffect(() => {
    let main = document.getElementsByClassName('main')[0]?.style;
    let channelContainer = document.getElementById('channelContainer')?.style;
    let tagsContainer = document.getElementById('tagsContainer')?.style;
    let blackoutBlock = document.getElementById('blackout-block')?.style;
    let contentWrapper = document.getElementById('app-wrapper-content')?.style;

    if (blur || modalBlur) {
      if (main) {
        tagsContainer.filter = main.filter = 'blur(3px)';
        channelContainer.filter = 'blur(3px)';
        if (!modalBlur) {
          blackoutBlock.opacity = 1;
          
        }
      } else if (contentWrapper) {
        contentWrapper.filter = 'blur(3px)';
        if (!modalBlur) {
          blackoutBlock.opacity = 1;
          
        }
      }
    } else {
      if (main) {
        tagsContainer.filter = main.filter = 'blur(0px)';
        channelContainer.filter = 'blur(0px)';
        blackoutBlock.opacity = 0;
        
      } else if (contentWrapper) {
        contentWrapper.filter = 'blur(0px)';
        blackoutBlock.opacity = 0;
      }
      //console.log(blur, modalBlur);
    }
  }, [blur, modalBlur]);

  return (
    <div className="app-wrapper">
        {/* <div id="blackout-block"></div> */}
      <HeaderContainer />
      <div className="app-wrapper-content" 
      style={{marginTop: showTagsStore ? '9vh' : (matches ? '9vh' : '6vh'),
        //marginTop: showTagsStore ? (matches ? '15vh' : '10vh') : (matches ? '9vh' : '6vh'),
      }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/404" element={<PageNotFound404 />} />
          <Route path="/video/:id" element={<OpenVideo />} />
          <Route path="/create_channel" element={<CreateChannel />} />
          <Route path="/search/:text" element={<SearchPage />} />
          <Route path="/history" element={<History />} />
          <Route path="/liked_videos" element={<LikedVideos />} />
          <Route path="/watch_later" element={<WatchLater />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/categories/:category" element={<Category />} />
          <Route path="/channel/:channelId" element={<Channel />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="*"
            element={<PageNotFound404 />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
