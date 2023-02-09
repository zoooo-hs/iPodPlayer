import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {IMusicLoadHandler, IMusicParser, musicLoadHandlerName, musicParserName} from './api/music';
import './App.css';
import contextManager from './bean-factory/context-manager';
import { LoadingType } from './common/loading-type';
import BackgroundCover from './components/background/background-cover';
import MediaPlayer from './components/media-player/media-player';
import { RootState } from './store';
import { changeMusic, fetch } from './store/music/music-store';


function App() {
  const dispatch = useDispatch();
  const musicStore = useSelector((state: RootState) => state.musicStore)
  const musicHandler: IMusicLoadHandler = contextManager.get(musicLoadHandlerName);
  const musicParser: IMusicParser = contextManager.get(musicParserName);

  const musicList = musicStore.musicList;
  const currentMusicTrackNumber = musicStore.currentMusicTrackNumber;
  const currentMusic = musicList[currentMusicTrackNumber];

  const [loadState, setLoadState] = useState<LoadingType>("INITIALIZED");

  useEffect(() => {
    if (loadState === "INITIALIZED") {
      reload();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadState]);

  useEffect(() => {
    if (!!!currentMusic) return;
    musicParser.thumbnailDataUrl(currentMusic)
      .then(thumbnailData => {
        currentMusic.thumbnail = thumbnailData;
        dispatch(changeMusic(currentMusicTrackNumber, currentMusic));
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMusic, currentMusicTrackNumber])


  function reload() {
    musicHandler.loadMusics()
      .then(musicList => {
        dispatch(fetch(musicList));
        setLoadState("LOADED");
      });
    setLoadState("LOADING");
  }


  if (loadState !== "LOADED") {
    return <div>loading</div>
  }

  return (
    <div id="App">
      <ReloadButton reload={reload}/>
      <BackgroundCover/>
      <MediaPlayer/>
    </div>
  );
}

function ReloadButton({reload}: {reload: ()=>void}) {
  return (
      <button id='reload-button' onClick={reload}>RELOAD</button>
  )
}

export default App;
