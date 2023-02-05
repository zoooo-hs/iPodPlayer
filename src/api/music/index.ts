import Music from "../../model/music";

export const musicLoadHandlerName = "musicLoadHandler";
export interface IMusicLoadHandler {
    loadMusics: () => Promise<Music[]>
}

export const musicParserName = "musicParser";
export interface IMusicParser {
    thumbnailDataUrl: (music: Music) => Promise<string>
}