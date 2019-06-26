import { KIWI_API } from '../../constants/servers';
import Server from '../../utils/server';

export const confirmTrip = async path => {
  return Server.post('path', {
    path
  }, KIWI_API);
};