import { combineReducers } from 'redux';
import musicStore from './music/music-store';

const rootReducer = combineReducers({
    musicStore
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;