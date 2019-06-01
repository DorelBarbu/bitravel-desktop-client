import axios from 'axios';

const server = 'http://localhost:5000';

class Server {
    async post(url,data) {
        return (await axios.post(`${server}/${url}`, data)).data;
    }
    async get(url) {
        return (await axios.get(`${server}/${url}`)).data;
    }
}

export default new Server();