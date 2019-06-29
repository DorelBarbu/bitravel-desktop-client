import axios from 'axios';

class Server {
  async post(url,data, origin) {
    console.log(origin, url);
    try {
      return (await axios.post(`${origin}/${url}`, data)).data;
    } catch(error) {
      return {
        isError: true,
        message: error
      };
    }
  }
  async get(url, origin) {
    console.log(origin, url);
    return (await axios.get(`${origin}/${url}`)).data;
  }
}

export default new Server();