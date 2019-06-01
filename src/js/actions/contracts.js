import { GET_CONTRACT_ABI, GET_CONTRACT_ABI_SUCCESS, GET_CONTRACT_ABI_ERROR } from '../constants/action-types';
import { getContract } from '../api/bitravel-eth/contracts';


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