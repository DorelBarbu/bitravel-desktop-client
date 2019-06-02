import { GET_CONTRACT_ABI, GET_CONTRACT_ABI_SUCCESS, GET_CONTRACT_ABI_ERROR, 
  DEPLOY_FACTORY_CONTRACT, DEPLOY_FACTORY_CONTRACT_ERROR, DEPLOY_FACTORY_CONTRACT_SUCCESS, 
  DEPLOY_TSP_CONTRACT, DEPLOY_TSP_CONTRACT_SUCCESS, DEPLOY_TSP_CONTRACT_ERROR } from '../constants/action-types';

const initialState = {
  abi: null,
  loadingAbi: false,
  loadingAbiError: null,
  factoryContract: null,
  loadingFactoryContract: false,
  loadingFactoryContractError: null,
  tspContracts: [],
  loadingTspContract: false,
  loadingTspContractError: null
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
      loadingAbiError: false,
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
  case DEPLOY_FACTORY_CONTRACT_SUCCESS:
    return {
      ...state,
      loadingFactoryContract: false,
      factoryContract: action.payload
    };
  case DEPLOY_FACTORY_CONTRACT_ERROR:
    return {
      ...state,
      loadingFactoryContract: false,
      factoryContract: null,
      loadingFactoryContractError: action.payload
    };
  case DEPLOY_TSP_CONTRACT:
    return {
      ...state,
      loadingTspContract: true,
      loadingTspContractError: null
    };
  case DEPLOY_TSP_CONTRACT_SUCCESS:
    return {
      ...state,
      loadingTspContract: false,
      tspContracts: [...state.tspContracts, action.payload],
      loadingTspContractError: null
    };
  case DEPLOY_TSP_CONTRACT_ERROR:
    return {
      ...state,
      loadingTspContract: false,
      loadingTspContractError: action.payload
    };
  default:
    return state;
  }
}

export default contractsReducer;