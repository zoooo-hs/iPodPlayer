import { AttributeFilter, CompositeFilter, content, Content, AudioContent } from "tizen-common-web";
import {IMusicLoadHandler} from ".";
import Music from "../../model/music";

export default class TizenMusicHandler implements IMusicLoadHandler {
    constructor() {

        console.log("hello")

    };
    loadMusics = (): Promise<Music[]> => {
        return new Promise<Music[]>((onSuccess, onFailure) => {
            let ipodMusicFilter = new AttributeFilter("contentURI", "CONTAINS", "iPod_Control/Music/");
            let filter = new CompositeFilter("INTERSECTION", [ipodMusicFilter]);

            content.find(
                // eslint-disable-next-line array-callback-return
                (contents: Content[]) => {
                    let musicList = contents.map((content): Music => {
                        let audioContent = content as AudioContent;
                        return {
                            parsed: false,
                            title: audioContent.title,
                            artist: audioContent.artists?.join(",") || "",
                            uri: audioContent.contentURI,
                            thumbnail: undefined
                        }
                    });
                    onSuccess(musicList);
                },
                (error) => { onFailure(error) },
                null, filter
            );
        });
    }
}
