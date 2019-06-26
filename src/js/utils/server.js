import axios from 'axios';

const server = 'http://localhost:5000';

class Server {
  async post(url,data, origin = null) {
    try {
      return (await axios.post(`${origin ? origin : server}/${url}`, data)).data;
    } catch(error) {
      return {
        isError: true,
        message: error
      };
    }
  }
  async get(url) {
    return (await axios.get(`${server}/${url}`)).data;
  }
}

export default new Server();