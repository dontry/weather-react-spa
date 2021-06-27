import axios, { AxiosRequestConfig } from 'axios';
import { LOCATION_BASE_URL } from '../common/constants';

const httpClient = axios.create();

export const initRequestHeader = (config: AxiosRequestConfig) => {
  config.baseURL = LOCATION_BASE_URL;
  config.params.key = process.env.LOCATION_API_KEY;
  return config;
};

httpClient.interceptors.request.use(initRequestHeader);

export const fetchLocations = (q: string) => {
  return httpClient.get('/search.php', {
    params: {
      q,
      format: 'json',
    },
  });
};
