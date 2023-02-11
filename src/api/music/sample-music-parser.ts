import { IMusicParser } from ".";
import Music from "../../model/music";

export default class SampleMusicParser implements IMusicParser {
    parse = (music: Music) :Promise<Music>  => {
        return Promise.resolve(music);
    }

    thumbnailDataUrl = (music: Music): Promise<string> => {
        return Promise.resolve(music.thumbnail || "");
    };
}
