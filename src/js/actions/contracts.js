import { GET_CONTRACT_ABI, GET_CONTRACT_ABI_SUCCESS, GET_CONTRACT_ABI_ERROR } from '../constants/action-types';
import Server from '../utils/server';

export function getContractABI() {
    return async dispatch => {
        await dispatch({
            type: GET_CONTRACT_ABI
        });
    };
}