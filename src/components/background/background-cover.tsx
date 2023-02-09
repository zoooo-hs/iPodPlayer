import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "./background-cover.css";
const BackgroundCover = function() {
    const musicStore = useSelector((state: RootState) => state.musicStore)
    const thumbnail = musicStore.musicList[musicStore.currentMusicTrackNumber]?.thumbnail || "";

    const [backgroundImage, setBackgroundImage] = useState(thumbnail);

    useEffect(() => {
        setBackgroundImage(thumbnail);
    }, [thumbnail])

    return <div style={{backgroundImage: `url("${backgroundImage}")`}} id="background-cover"></div>
}

export default BackgroundCover;