import { GET_CONTRACT_ABI, GET_CONTRACT_ABI_SUCCESS, GET_CONTRACT_ABI_ERROR,
    DEPLOY_FACTORY_CONTRACT, DEPLOY_FACTORY_CONTRACT_SUCCESS, DEPLOY_FACTORY_CONTRACT_ERROR } 
    from '../constants/action-types';
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

export function deployFactory(account, gas) {
    return async (dispatch, getState) => {
        const web3 = getState().init.web3;
        const bytecode = getState().contracts.abi.factory.bytecode;
        const interf = getState().contracts.abi.factory.interface;
        const tspFactory = await new web3.eth.Contract(JSON.parse(interf))
            .deploy({ data: bytecode })
            .send({ from: account, gas });
        console.warn(tspFactory);
        dispatch({
            type: DEPLOY_FACTORY_CONTRACT
        });
    };
}