import HTTPBlobReader from "../api/blob/http-blob-reader";
import TizenFileSystemBlobReader from "../api/blob/tize-fs-blob-reader";
import MusicParserImpl from "../api/music/music-parser-impl";
import SampleMusicHandler from "../api/music/sample-music-handler";
import TizenMusicHandler from "../api/music/tizen-music-handler";
import contextManager from "./context-manager";

export default function init() {
    initTizen();
    // initLocalReact();
}

function initTizen() {
    contextManager.set("musicHandler", new TizenMusicHandler());
    contextManager.set("blobReader", new TizenFileSystemBlobReader());
    contextManager.set("musicParser", new MusicParserImpl(
        contextManager.get("blobReader")
    ));
}

function initLocalReact() {
    contextManager.set("musicHandler", new SampleMusicHandler());
    contextManager.set("blobReader", new HTTPBlobReader());
    contextManager.set("musicParser", new MusicParserImpl(
        contextManager.get("blobReader")
    ));
}
