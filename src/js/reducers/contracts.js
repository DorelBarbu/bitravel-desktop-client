import { GET_CONTRACT_ABI, GET_CONTRACT_ABI_SUCCESS, GET_CONTRACT_ABI_ERROR } from '../constants/action-types';

const initialState = {
    abi: null,
    loadingAbi: false,
    loadingAbiError: null
};

function contractsReducer(state = initialState, action) {
    let abi;
    switch(action.type) {
    case GET_CONTRACT_ABI:
        return {
            ...state,
            loadingAbi: true,
            loadingAbiError: null
        };
    case GET_CONTRACT_ABI_SUCCESS:
        abi = {
            ...state.abi
        };
        abi[action.contractType] = action.contract;
        return {
            ...state,
            loadingAbi: false,
            loadingAbError: false,
            abi
        };
    case GET_CONTRACT_ABI_ERROR:
        return {
            ...state,
            loadingAbi: false,
            loadingAbiError: action.payload
        };
    default:
        return state;
    }
}

export default contractsReducer;