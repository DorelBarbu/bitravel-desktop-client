import initReducer from './init';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    init: initReducer
});

export default rootReducer;