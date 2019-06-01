import Server from '../../utils/server';

export async function getContract(contractType) {
    const response = await Server.get(`contract/abi/${contractType}`);
    return response;
}