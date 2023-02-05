import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Music from "../../../model/music";
import { RootState } from "../../../store";
import "./media-controller.css";

const MediaController = function() {
    const musicStore = useSelector((state: RootState) => state.musicStore)
    const currentMusic: Music = musicStore.musicList[musicStore.currentMusicTrackNumber];

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (!!audioRef.current) {
            audioRef.current.load();
        }
    }, [currentMusic.uri])

    if (!!!currentMusic) {
        return <div></div>
    }
    return (
        <div>
            <h1>{currentMusic.title}</h1>
            <h2>{currentMusic.artist}</h2>
            <img src={currentMusic.thumbnail}
            style={{padding: "15px"}}
            width="200px" height="200px" alt="album-cover"/>
            <audio
                ref={audioRef}
                controls={true}>
                <source src={currentMusic.uri}></source>
            </audio>
        </div>

    )
}

export default MediaController;