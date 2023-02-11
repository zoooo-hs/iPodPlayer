import { IMusicParser } from ".";
import Music from "../../model/music";
import { IBlobReader } from "../blob";
// import * as mm from 'music-metadata-browser';
import jsmediatags from "jsmediatags";
import {TagType} from "jsmediatags/types";


window.Buffer = window.Buffer || require("buffer").Buffer;

interface Lyrics {
    lyrics: string
}

export default class MusicParserImpl implements IMusicParser {
    blobReader: IBlobReader;

    constructor(blobReader: IBlobReader) {
        this.blobReader = blobReader;
    }

    parse = (music: Music): Promise<Music> => {
        return new Promise<Music>((onSuccess, onFailure) => {
            Promise.resolve(music.uri)
            .then(this.blobReader.read)
            .then(blob => {
                jsmediatags.read(blob, {
                    onSuccess: (tag: TagType) => {
                        var tags = tag.tags;
                        var base64String = "";

                        let thumbnail, lyrics;
                        if (!!tags.picture) {
                            for (var i = 0; i < tags.picture.data.length; i++) {
                                base64String += String.fromCharCode(tags.picture.data[i]);
                            }
                            thumbnail = "data:" + tags.picture.format + ";base64,"
                            + window.btoa(base64String);
                        }

                        if (!!tags.lyrics) {
                            let temp: Lyrics | string = tags.lyrics;
                            if (typeof temp === "object") {
                                lyrics = (temp as Lyrics).lyrics;
                            } else if (typeof tags.lyrics === "string") {
                                lyrics = tags.lyrics
                            }
                        }

                        let newMusic: Music = {...music, thumbnail, lyrics, parsed: true };
                        onSuccess(newMusic);
                    },
                    onError: (error: any) => {
                        onFailure(error);
                    }
                });
            });
        });
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
