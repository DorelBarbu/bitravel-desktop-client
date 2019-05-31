import axios from 'axios';

const server = '0.0.0.0:5000';

class Server {
    async post(url,data) {
        return axios.post(`${server}/${url}`, data);
    }
}

export default Server;