import Server from '../utils/server';
import Logger from '../utils/logger';
// eslint-disable-next-line no-undef
const isLocal = process.env.REACT_APP_LOCAL_BLOCKCHAIN;

export async function setReward (accountId, address, reward) {
  // const web3 = window.web3;
  if(isLocal === 'true') {
    try {
      const response = await Server.post(`contract/${address}/reward`, {
        reward,
        accountId
      });
      return response;
    } catch(error) {
      Logger.err(error);
    }
  } else {
    //TODO: connect to metamask
  }
}

export async function deployTsp(contractData, factory) {
  if(isLocal === 'true') {
    try {
      const response = await Server.post(`contract/factory/${factory}`, {
        account: contractData.account,
        gas: contractData.gas,
        size: contractData.size,
        mongodbAddress: contractData.mongodbAddress
      });
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