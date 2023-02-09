import "./media-queue.css"
import Music from "../../../model/music";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useDispatch } from "react-redux";
import { setCurrent } from "../../../store/music/music-store";
import { ChangeEvent, useEffect, useState } from "react";

interface OrderedMusic {
    music: Music,
    index: number
}

const MediaQueue = function() {
    const dispatch = useDispatch();
    const musicStore = useSelector((state: RootState) => state.musicStore)
    const musicList = musicStore.musicList;
    const currentMusicTrackNumber: number = musicStore.currentMusicTrackNumber;

    const [filteredMusicList, setFilteredMusicList] = useState<OrderedMusic[]>([]);
    const [filterInput, setFilterInput] = useState("");

    function filter(e: ChangeEvent<HTMLInputElement>) {
        setFilterInput(e.target.value||"");
    }

    useEffect(() => {
        // TODO: 트랙 넘버를 매번 넣지 않고 노래를 식별하고, 다음 노래를 식별할 수 있는 방법 찾기
        const filterd = musicList.map((music, index) => { return {music, index}}).filter(orderedMusic => orderedMusic.music.title.toLowerCase().includes(filterInput.toLowerCase()));
        setFilteredMusicList(filterd);
    }, [filterInput, musicList]);

    function playThis(index: number) {
        dispatch(setCurrent(index));
    }

    return(
        <div id="media-queue">
            <input type="text" name="filter-input" onChange={filter}/>
            <MusicList musicList={filteredMusicList} currentMusicTrackNumber={currentMusicTrackNumber} playThis={playThis}/>
        </div>
    )
}

function MusicList({musicList, currentMusicTrackNumber ,playThis}: {musicList: OrderedMusic[], currentMusicTrackNumber: number ,playThis: (index: number)=>void}) {

    function className(index: number): string {
        let className = "music";
        if (index === currentMusicTrackNumber) {
            className += " playNow";
        }

        return className;
    }

    return(
        <>
            {musicList.map((orderedMusic: OrderedMusic) => 
                <span key={orderedMusic.index} onClick={() => {playThis(orderedMusic.index)}} className={className(orderedMusic.index)}>{orderedMusic.music.title}</span>
            )}
        </>
    )

}

export default MediaQueue;