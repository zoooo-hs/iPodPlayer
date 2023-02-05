import Music from "../../model/music";

export interface IMusicLoadHandler {
    loadMusics: () => Promise<Music[]>
}

export interface IMusicParser {
    thumbnailDataUrl: (music: Music) => Promise<string>
}