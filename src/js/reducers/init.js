import { INIT_WEB3_SUCCESS, INIT_WEB3_DENIED } from '../constants/action-types';

const initialState = {
    web3: null,
    web3Error: null
};

function initReducer(state = initialState, action) {
    if(action.type === INIT_WEB3_SUCCESS) {
        return {
            ...state,
            web3: action.payload
        };
    }
    if(action.type === INIT_WEB3_DENIED) {
        return {
            ...state,
            web3Error: action.payload
        };
    }
    return state;
}

export default initReducer;