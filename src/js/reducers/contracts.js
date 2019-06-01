import { GET_CONTRACT_ABI, GET_CONTRACT_ABI_SUCCESS, GET_CONTRACT_ABI_ERROR, DEPLOY_FACTORY_CONTRACT } from '../constants/action-types';

const initialState = {
    abi: null,
    loadingAbi: false,
    loadingAbiError: null,
    factoryContract: null,
    loadingFactoryContract: null,
    loadingFactoryContractError: false
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
            ...(state.abi)
        };
        abi[action.payload.contractType] = action.payload.abi;
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
    case DEPLOY_FACTORY_CONTRACT:
        return {
            ...state,
            loadingFactoryContract: true
        };
        
    default:
        return state;
    }
}

export default contractsReducer;