import initReducer from './init';
import accountsReducer from './accounts';
import contractReducer from './contracts';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    init: initReducer,
    accounts: accountsReducer,
    contracts: contractReducer
});

export default rootReducer;