import Server from '../../utils/server';
import { BITRAVEL_ETH } from '../../constants/servers';

export async function getContract(contractType) {
  const response = await Server.get(`contract/abi/${contractType}`, BITRAVEL_ETH);
  return response;
}