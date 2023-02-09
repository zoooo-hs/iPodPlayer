const TOGGLE_LYRICS = "MEDIA_CONTRORL/TOGGLE_LYRICS";

export const toggleLyrics = (toggleLyrics: boolean) => ({
    type: TOGGLE_LYRICS,
    payload: {
        showLyrics: toggleLyrics
    }

});

export type MediaControlAction = 
    | ReturnType<typeof toggleLyrics>;

export type MediaControlState = {
    showLyrics: boolean
}

const initialState: MediaControlState = {
    showLyrics: false
}



function mediaControlStore(state: MediaControlState = initialState, action: MediaControlAction): MediaControlState {
    switch(action.type) {
        case TOGGLE_LYRICS: 
            return { ...state, showLyrics: action.payload.showLyrics };
        default:
            return state;
    }
}

export default mediaControlStore;