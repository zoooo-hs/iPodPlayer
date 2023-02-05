import { IMusicParser } from ".";
import Music from "../../model/music";
import { IBlobReader } from "../blob";
// import * as mm from 'music-metadata-browser';
const jsmediatags = require("jsmediatags");


window.Buffer = window.Buffer || require("buffer").Buffer;

export default class MusicParserImpl implements IMusicParser {
    blobReader: IBlobReader;

    constructor(blobReader: IBlobReader) {
        this.blobReader = blobReader;
    }
    
    thumbnailDataUrl = (music: Music): Promise<string> => {
        return new Promise<string>((onSuccess, onFailure) => {
            Promise.resolve(music.uri)
                .then(this.blobReader.read)
                .then(blob => {
                    jsmediatags.read(blob, {
                        onSuccess: (tag: any) => {
                            var tags = tag.tags;
                            var base64String = "";
            
                            for (var i = 0; i < tags.picture.data.length; i++) {
                                base64String += String.fromCharCode(tags.picture.data[i]);
                            }
                            var dataUrl = "data:" + tags.picture.format + ";base64,"
                                + window.btoa(base64String);
                            onSuccess(dataUrl);
                        },
                        onError: (error: any) => {
                            onFailure(error);
                        }
                    });
                });
        });
    };
}