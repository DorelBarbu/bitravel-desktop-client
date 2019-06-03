import { GET_CONTRACT_ABI, GET_CONTRACT_ABI_SUCCESS, GET_CONTRACT_ABI_ERROR,
  DEPLOY_FACTORY_CONTRACT, DEPLOY_FACTORY_CONTRACT_SUCCESS, DEPLOY_FACTORY_CONTRACT_ERROR,
  DEPLOY_TSP_CONTRACT, DEPLOY_TSP_CONTRACT_ERROR, DEPLOY_TSP_CONTRACT_SUCCESS,
  GET_DEPLOYED_CONTRACT, GET_DEPLOYED_CONTRACT_SUCCESS, GET_DEPLOYED_CONTRACT_ERROR,
  GET_DEPLOYED_TSP_CONTRACTS, GET_DEPLOYED_TSP_CONTRACTS_ERROR, GET_DEPLOYED_TSP_CONTRACTS_SUCCCESS } 
  from '../constants/action-types';
import { getContract } from '../api/bitravel-eth/contracts';
import Server from '../utils/server';

// eslint-disable-next-line no-undef
const isLocal = process.env.REACT_APP_LOCAL_BLOCKCHAIN;

export function getDeployedContract(address, contractType) {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_DEPLOYED_CONTRACT,
      payload: {
        contractType
      }
    });
    if(isLocal === 'true') {
      const web3 = getState().init.web3;
      let interf = getState().contracts.tsp[contractType];
      try {
        const contract = await new web3.Contract(JSON.parse(interf));
        dispatch({
          type: GET_DEPLOYED_CONTRACT_SUCCESS,
          payload: contract
        });
      } catch(error) {
        dispatch({
          type: GET_DEPLOYED_CONTRACT_ERROR,
          payload: error
        });
      }
    }
  };
}


export function getContractAbi(contractType) {
  return async dispatch => {
    await dispatch({
      type: GET_CONTRACT_ABI
    });
    try {
      const response = await getContract(contractType);
      dispatch({
        type: GET_CONTRACT_ABI_SUCCESS,
        payload: {
          abi: response.data,
          contractType
        }
      });
    } catch(error) {
      dispatch({
        type: GET_CONTRACT_ABI_ERROR,
        payload: 'Unable to fetch contract ABI'
      });
    }
  };
}

export function deployFactory(account, gas) {
  return async (dispatch, getState) => {
    const bytecode = getState().contracts.abi.factory.bytecode;
    const interf = getState().contracts.abi.factory.interface;
    dispatch({
      type: DEPLOY_FACTORY_CONTRACT
    });
    try {
      let tspFactory;
      if(isLocal === 'true') {
        tspFactory =  (await Server.post('contract/factory', {
          gas,
          account
        })).data.address;
      } else {
        const web3 = getState().init.web3;
        tspFactory = await new web3.eth.Contract(JSON.parse(interf))
          .deploy({ data: bytecode })
          .send({ from: account, gas, gasPrice: '3000000' });
      }
      dispatch({
        type: DEPLOY_FACTORY_CONTRACT_SUCCESS,
        payload: tspFactory
      });
    } catch(error) {
      dispatch({
        type: DEPLOY_FACTORY_CONTRACT_ERROR,
        payload: error
      });
    }
  };
}

export function deployTsp(contractData) {
  return async (dispatch, getState) => {
    const factory = getState().contracts.factoryContract;
    dispatch({
      type: DEPLOY_TSP_CONTRACT
    });
    if(isLocal === 'true') {
      try {
        const response = await Server.post(`contract/factory/${factory}`, {
          account: contractData.account,
          gas: contractData.gas,
          size: contractData.size,
          mongodbAddress: contractData.mongodbAddress
        });
        if(response.isError === false) {
          dispatch({
            type: DEPLOY_TSP_CONTRACT_SUCCESS,
            payload: response.data
          });
        } else {
          dispatch({
            type: DEPLOY_TSP_CONTRACT_ERROR,
            payload: response.message
          });
        }
      } catch(error) {
        dispatch({
          type: DEPLOY_TSP_CONTRACT_ERROR,
          payload: error
        });
      }
    }
  };
}

export function getDeployedTspContracts() {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_DEPLOYED_TSP_CONTRACTS
    });
    if(isLocal === 'true') {
      const factoryId = getState().contracts.factoryContract;
      try {
        const response = await Server.get(`contract/factory/${factoryId}/deployed`);
        if(response.isError === false) {
          dispatch({
            type: GET_DEPLOYED_TSP_CONTRACTS_SUCCCESS,
            payload: response.data
          });
        } else {
          dispatch({
            type: GET_DEPLOYED_TSP_CONTRACTS_ERROR,
            payload: response.message
          });
        }
      } catch(error) {
        dispatch({
          type: GET_DEPLOYED_TSP_CONTRACTS_ERROR,
          payload: error
        });
      }
    }
  };
}