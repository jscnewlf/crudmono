import { combineReducers } from 'redux';
import postReducer from './postReducer';

const rootReducer = combineReducers({
    posts: postReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
