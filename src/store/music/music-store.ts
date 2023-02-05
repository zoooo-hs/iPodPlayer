import Music from "../../model/music";


const FETCH = "MUSIC/FETCH";
const SET_CURRENT = "MUSIC/SET_CURRENT";
const CHANGE_MUSIC = "MUSIC/CHANGE_MUSIC";


export const fetch = (musicList: Music[]) => ({
    type: FETCH,
    payload: {
        musicList,
        currentMusicTrackNumber: 0
    }

});
export const setCurrent = (index: number) => ({
    type: SET_CURRENT,
    payload: {
        musicList: [],
        currentMusicTrackNumber: index
    }
});

export const changeMusic = (index: number, music: Music) => (
    {
        type: CHANGE_MUSIC,
        payload: {
            musicList: [music],
            currentMusicTrackNumber: index
        }
    }
)

export type MusicAction = 
    | ReturnType<typeof fetch>
    | ReturnType<typeof setCurrent>;

export type MusicState = {
    currentMusicTrackNumber: number,
    musicList: Music[],
    isLoaded: boolean
}

const initialMusicState: MusicState = {
    currentMusicTrackNumber: -1,
    musicList: [],
    isLoaded: false
}



function musicStore(state: MusicState = initialMusicState, action: MusicAction): MusicState {
    switch(action.type) {
        case FETCH: 
            return { musicList: action.payload.musicList, currentMusicTrackNumber: 0, isLoaded: true };
        case SET_CURRENT:
            return { ...state, currentMusicTrackNumber: action.payload.currentMusicTrackNumber };
        case CHANGE_MUSIC:
            let musicList = state.musicList;
            musicList[action.payload.currentMusicTrackNumber] = action.payload.musicList[0];
            return { ...state, musicList };
        default:
            return state;
    }
}

export default musicStore;