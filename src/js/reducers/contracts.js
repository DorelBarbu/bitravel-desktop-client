import { GET_CONTRACT_ABI, GET_CONTRACT_ABI_SUCCESS, GET_CONTRACT_ABI_ERROR, 
  DEPLOY_FACTORY_CONTRACT, DEPLOY_FACTORY_CONTRACT_ERROR, DEPLOY_FACTORY_CONTRACT_SUCCESS, 
  DEPLOY_TSP_CONTRACT, DEPLOY_TSP_CONTRACT_SUCCESS, DEPLOY_TSP_CONTRACT_ERROR,
  GET_DEPLOYED_CONTRACT, GET_DEPLOYED_CONTRACT_SUCCESS, GET_DEPLOYED_CONTRACT_ERROR,
  GET_DEPLOYED_TSP_CONTRACTS, GET_DEPLOYED_TSP_CONTRACTS_ERROR, GET_DEPLOYED_TSP_CONTRACTS_SUCCCESS } from '../constants/action-types';

const initialState = {
  abi: null,
  loadingAbi: false,
  loadingAbiError: null,
  factoryContract: '0x819B94E92Fe998745ca9E1eE5135FCdDeb12fE4E',
  loadingFactoryContract: false,
  loadingFactoryContractError: null,
  tspContracts: [],
  loadingTspContract: false,
  loadingTspContractError: null,
  deployedContract: null,
  loadingDeployedContract: false,
  loadingDeployedContractError: null,
  deployedTspContracts: [],
  loadingDeployedTspContracts: false,
  loadingDeployedTspContractsError: null
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
  case GET_DEPLOYED_CONTRACT:
    return {
      ...state,
      loadingDeployedContract: true,
      deployedContract: {
        type: action.payload.contractType
      },
      loadingDeployedContractError: null
    };
  case GET_DEPLOYED_CONTRACT_SUCCESS:
    return {
      ...state,
      loadingDeployedContract: false,
      deployedContract: {
        type: state.deployedContract.type,
        contract: action.payload
      },
      loadingDeployedContractError: null
    };
  case GET_DEPLOYED_CONTRACT_ERROR:
    return {
      ...state,
      loadingDeployedContract: false,
      deployedContract: null,
      loadingDeployedContractError: action.payload
    };
  case GET_DEPLOYED_TSP_CONTRACTS:
    return {
      ...state,
      deployedTspContracts: [],
      loadingDeployedTspContracts: true,
      loadingDeployedTspContractsError: null
    };
  case GET_DEPLOYED_TSP_CONTRACTS_SUCCCESS:
    return {
      ...state,
      deployedTspContracts: action.payload,
      loadingDeployedTspContracts: false,
      loadingDeployedTspContractsError: null
    };
  case GET_DEPLOYED_TSP_CONTRACTS_ERROR:
    return {
      ...state,
      deployedTspContracts: [],
      loadingDeployedTspContracts: false,
      loadingDeployedTspContractsError: action.payload
    };
  default:
    return state;
  }
}

export default contractsReducer;