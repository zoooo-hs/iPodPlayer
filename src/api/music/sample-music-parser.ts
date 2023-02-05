import { IMusicParser } from ".";
import Music from "../../model/music";

export default class SampleMusicParser implements IMusicParser {
    thumbnailDataUrl = (music: Music): Promise<string> => {
        return Promise.resolve(music.thumbnail || "");
    };
}