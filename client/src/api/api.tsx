import axios from 'axios';

const api = axios.create({
  baseURL: `http://${process.env.HOST}:${process.env.SERVER_PORT}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.response.use();

export { api };
