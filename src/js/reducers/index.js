import initReducer from './init';
import accountsReducer from './accounts';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    init: initReducer,
    accounts: accountsReducer
});

export default rootReducer;