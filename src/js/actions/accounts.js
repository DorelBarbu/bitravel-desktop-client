import { GET_ACCOUNTS, GET_ACCOUNTS_SUCCESS, GET_ACCOUNTS_ERROR } from '../constants/action-types';
import Logger from '../utils/logger';
import Server from '../utils/server';
import { BITRAVEL_ETH } from '../constants/servers';

// eslint-disable-next-line no-undef
const isLocal = process.env.REACT_APP_LOCAL_BLOCKCHAIN;

export function getAccounts() {
  return async (dispatch, getState) => {
    dispatch({
      type:GET_ACCOUNTS
    });
    if(isLocal === 'true') {
      try {
        const response = await Server.get('account', BITRAVEL_ETH);
        if(response.isError === true) {
          dispatch({
            type: GET_ACCOUNTS_ERROR,
            payload: response.message
          });
        } else {
          dispatch({
            type: GET_ACCOUNTS_SUCCESS,
            payload: response.data.accounts
          });
        }
      } catch(error) {
        dispatch({
          type: GET_ACCOUNTS_ERROR,
          payload: error
        });
      }
    } else {
      const web3 = getState().init.web3;
      await dispatch({
        type: GET_ACCOUNTS
      });
      try {
        const accounts = await web3.eth.getAccounts();
        dispatch({
          type: GET_ACCOUNTS_SUCCESS,
          payload: accounts
        });
      } catch(error) {
        Logger.err(error);
        dispatch({
          type: GET_ACCOUNTS_ERROR,
          payload: 'Error fetching accounts'
        });
      }
    }
  };
}