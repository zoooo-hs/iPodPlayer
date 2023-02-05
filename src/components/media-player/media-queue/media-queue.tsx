import "./media-queue.css"
import Music from "../../../model/music";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useDispatch } from "react-redux";
import { setCurrent } from "../../../store/music/music-store";

const MediaQueue = function() {
    const dispatch = useDispatch();
    const musicStore = useSelector((state: RootState) => state.musicStore)
    const musicList = musicStore.musicList;
    const currentMusicTrackNumber: number = musicStore.currentMusicTrackNumber;

    function className(index: number): string {
        let className = "music";
        if (index === currentMusicTrackNumber) {
            className += " playNow";
        }

        return className;
    }

    function onClick(index: number) {
        dispatch(setCurrent(index));
    }


    return(
        <div id="media-queue">
            {musicList.map((music: Music, index: number) => 
                <span key={index} onClick={() => { onClick(index); }} className={className(index)}>{music.title}</span>
            )}
        </div>
    )
}

export default MediaQueue;