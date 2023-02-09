import {IMusicLoadHandler} from ".";
import Music from "../../model/music";

const sampleMusic:Music = { title: "전설", artist: "JANNABI", uri: "http://localhost:8000/test.mp3", thumbnail: undefined };

const sampleMusic2:Music = { title: "citi eyes", artist: "JANNABI", uri: "http://localhost:8000/test2.mp3", thumbnail: "http://localhost:8000/thumbnail2.jpeg" };
const sampleMusicList: Music[] = [sampleMusic, sampleMusic2];

for (let index = 1; index < 60; index++) {
    let clone = JSON.parse(JSON.stringify(sampleMusic))
    clone.title = clone.title + index;
    sampleMusicList.push(clone);
}
export default class SampleMusicHandler implements IMusicLoadHandler {
    loadMusics = ():Promise<Music[]> => {
        return new Promise((resolve ,reject) => {
            setTimeout(() => {
                resolve(sampleMusicList);
            }, 2000);
        });
    };
}
