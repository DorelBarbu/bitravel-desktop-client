import Web3 from 'web3';
import { INIT_WEB3_SUCCESS, INIT_WEB3_DENIED } from '../constants/action-types';

export function initWeb3() {
    /* Intialise the web3 object */
    return async dispatch => {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            dispatch({
                type: INIT_WEB3_SUCCESS,
                payload: window.web3
            });
        }
        try {
            await window.ethereum.enable();
        } catch(error) {
            dispatch({
                type: INIT_WEB3_DENIED,
                payload: 'User denied access to web3 error'
            });
        }
    }
}