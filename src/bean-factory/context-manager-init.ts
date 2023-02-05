import SampleMusicHandler from "../api/music/sample-music-handler";
import SampleMusicParser from "../api/music/sample-music-parser";
import contextManager from "./context-manager";

export default function init() {
    contextManager.set("musicHandler", new SampleMusicHandler());
    // contextManager.set("musicHandler", new TizenMusicHandler());
    contextManager.set("musicParser", new SampleMusicParser());


    // contextManager.set("blobReader", new HTTPBlobReader());
    // contextManager.set("musicParser", new MusicParserImpl(
    //     contextManager.get("blobReader")
    // ));
}
