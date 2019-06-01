import { GET_ACCOUNTS, GET_ACCOUNTS_SUCCESS, GET_ACCOUNTS_ERROR } from '../constants/action-types';
import web3 from '../utils/web3';
import Logger from '../utils/logger';

export function getAccounts() {
    return async dispatch => {
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
    };
}