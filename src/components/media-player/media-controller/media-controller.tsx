import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Music from "../../../model/music";
import { RootState } from "../../../store";
import { setCurrent } from "../../../store/music/music-store";
import "./media-controller.css";

function LyricsBox({lyrics}: {lyrics?: string}) {
    return (
            <>
                <div className="thumbnail-lyric-black"></div>
                <pre className="thumbnail-lyric">
                {lyrics}
                </pre>
            </>
           )
}

function ThumbnailWithLyrics({dataUrl, lyrics, showLyrics}: {dataUrl?: string, lyrics?: string, showLyrics: boolean}) {
    function className() {
        if (showLyrics) {
            return "thumbnail blured";
        }

        return "thumbnail";

    }

    return (
            <div className="thumbnail-container">
                <img className={className()} src={dataUrl} alt="album-cover"/>
                {showLyrics?
                <LyricsBox lyrics={lyrics}/>
                :
                null
                }
            </div>
           );
}

const MediaController = function() {
    const dispatch = useDispatch();
    const musicStore = useSelector((state: RootState) => state.musicStore)
    const musicList: Music[] = musicStore.musicList;
    const currentMusicTrackNumber: number = musicStore.currentMusicTrackNumber;
    const currentMusic: Music = musicList[currentMusicTrackNumber];
    const musicListLength = musicList.length;

    // TOOD: html 기본 audio의 컨트롤러가 아닌, 자체 component로 재생, 정지, 반복 컨트롤 제공
    const [isPlaying, setPlaying] = useState(false);
    const [isLoop, setLoop] = useState(false);
    const [showLyrics, setShowLyrics] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (!!audioRef.current) {
            audioRef.current.load();
            if (isPlaying)
                audioRef.current.play();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentMusic?.uri])

    function onEnded() {
        dispatch(setCurrent((currentMusicTrackNumber + 1) % musicListLength));
    }

    function onClickPlay() {
        setPlaying(true);
    }

    function LoopButton() {
        // TODO: MUI 적용하기
        return (
            <label>LOOP
                <input type="checkbox" name="chk_info" value="checked" checked={isLoop} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoop(e.target.checked)} />
            </label>
        )
    }

    function LyricsButton() {
        // TODO: MUI 적용하기
        return (
            <label>Lyrics
                <input type="checkbox" name="chk_info" value="checked" checked={showLyrics} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShowLyrics(e.target.checked)} />
            </label>
        )
    }


    if (!!!currentMusic) {
        return <div></div>
    }
    return (
        <div id="media-controller">
            <h1>{currentMusic.title}</h1>
            <h2>{currentMusic.artist}</h2>
            <ThumbnailWithLyrics dataUrl={currentMusic.thumbnail} lyrics={currentMusic.lyrics} showLyrics={showLyrics}/>
            <LoopButton />
            <LyricsButton />
            <audio
                ref={audioRef}
                onEnded={onEnded}
                onPlayCapture={onClickPlay}
                loop={isLoop}
                controls={true}>
                <source src={currentMusic.uri}></source>
            </audio>
        </div>

    )
}

export default MediaController;
