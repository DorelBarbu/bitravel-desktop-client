import Server from '../utils/server';
import Logger from '../utils/logger';
import { BITRAVEL_ETH } from '../constants/servers';
import { getGraphById } from '../api/bitravel-main/graph';
// eslint-disable-next-line no-undef
const isLocal = process.env.REACT_APP_LOCAL_BLOCKCHAIN;

export async function setReward (accountId, address, reward) {
  // const web3 = window.web3;
  if(isLocal === 'true') {
    try {
      const response = await Server.post(`contract/${address}/reward`, {
        reward,
        accountId
      }, BITRAVEL_ETH);
      return response;
    } catch(error) {
      Logger.err(error);
    }
  } else {
    //TODO: connect to metamask
  }
}

export async function getGraphToContribute(account, contract) {
  const tspContract = (await getTspInstance(contract)).contract;
  const graph = (await getGraphById(tspContract.tspInstanceAddress)).data;
  return graph;
}

export async function increment(account, contract) {
  const response = await Server.post(`contract/${contract}/increment`, {
    account
  }, BITRAVEL_ETH);
  return response;
}

export async function deployTsp(contractData, factory) {
  if(isLocal === 'true') {
    try {
      const response = await Server.post(`contract/factory/${factory}`, {
        account: contractData.account,
        gas: contractData.gas,
        size: contractData.size,
        mongodbAddress: contractData.mongodbAddress
      }, BITRAVEL_ETH);
      return response;
    } catch(err) {
      return {
        isError: true,
        message: err
      };
    }
  } else {
    //TODO: connect to metamask
  }
}

export async function getTspInstance(contract) {
  try {
    const response = await Server.get(`contract/tsp/${contract}`, BITRAVEL_ETH);
    return {
      isError: false,
      contract: response.data
    };
  } catch(error) {
    return {
      isError: true,
      error: 'Error retrieving deployed tsp instance'
    };
  }
}

export async function contribute(contract, account, value, index) {
  try {
    const response = await Server.post(`contract/${contract}/contribute`, {
      value, account, index
    }, BITRAVEL_ETH);
    return response;
  } catch(error) {
    return {
      isError: true,
      error: 'Error contributing to contract'
    };
  }
}