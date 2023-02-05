import "./media-player.css";
import MediaController from "./media-controller/media-controller";
import MediaQueue from "./media-queue/media-queue";

const MediaPlayer = function() {
    return (
    <div id="media-player">
       <MediaController/>
       <MediaQueue/>
    </div>
    )
}

export default MediaPlayer