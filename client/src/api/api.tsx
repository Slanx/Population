import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const api = axios.create({
  baseURL: `http://localhost:${publicRuntimeConfig.SERVER_PORT}`,
});

export { api };
