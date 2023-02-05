import HTTPBlobReader from "../api/blob/http-blob-reader";
import TizenFileSystemBlobReader from "../api/blob/tize-fs-blob-reader";
import MusicParserImpl from "../api/music/music-parser-impl";
import { musicLoadHandlerName, musicParserName } from "../api/music";
import SampleMusicHandler from "../api/music/sample-music-handler";
import TizenMusicHandler from "../api/music/tizen-music-handler";
import contextManager from "./context-manager";
import { blobReaderName } from "../api/blob";


export default function init() {
    initTizen();
    // initLocalReact();
}

function initTizen() {
    contextManager.set(musicLoadHandlerName, new TizenMusicHandler());
    contextManager.set(blobReaderName, new TizenFileSystemBlobReader());
    contextManager.set(musicParserName, new MusicParserImpl(
        contextManager.get(blobReaderName)
    ));
}

function initLocalReact() {
    contextManager.set(musicLoadHandlerName, new SampleMusicHandler());
    contextManager.set(blobReaderName, new HTTPBlobReader());
    contextManager.set(musicParserName, new MusicParserImpl(
        contextManager.get(blobReaderName)
    ));
}
