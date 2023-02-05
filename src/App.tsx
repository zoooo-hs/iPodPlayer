import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {IMusicLoadHandler, IMusicParser} from './api/music';
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
  const musicHandler: IMusicLoadHandler = contextManager.get("musicHandler");
  const musicParser: IMusicParser = contextManager.get("musicParser");

  const musicList = musicStore.musicList;
  const currentMusicTrackNumber = musicStore.currentMusicTrackNumber;
  const currentMusic = musicList[currentMusicTrackNumber];

  const [loadState, setLoadState] = useState<LoadingType>("INITIALIZED");

  useEffect(() => {
    if (loadState === "INITIALIZED") {
      musicHandler.loadMusics()
        .then(musicList => {
          dispatch(fetch(musicList));
          setLoadState("LOADED");
        });
      setLoadState("LOADING");
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

  if (loadState !== "LOADED") {
    return <div>loading</div>
  }

  return (
    <div className="App">
      <BackgroundCover/>
      <MediaPlayer/>
    </div>
  );
}

export default App;
