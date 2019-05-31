import { INIT_WEB3 } from '../constants/action-types';

const initialState = {
    web3: null
};

function initReducer(state = initialState, action) {
    if(action.type === INIT_WEB3) {
        return {
            ...state,
            web3: action.payload
        };
    }
    return state;
}

export default initReducer;