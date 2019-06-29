import { BITRAVEL_MAIN } from '../../constants/servers';
import Server from '../../utils/server';

export const insertGraph = async graph => {
  return Server.post('graph', {
    graph
  }, BITRAVEL_MAIN);
};

export const getAllTrips = async () => {
  return Server.get('graph', BITRAVEL_MAIN);
};