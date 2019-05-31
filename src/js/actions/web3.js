import { INIT_WEB3 } from '../constants/action-types';
import web3 from '../utils/web3';

export function initWeb3() {
    /* Intialise the web3 object */
    return {
        type: INIT_WEB3,
        payload: web3
    };
}