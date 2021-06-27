import axios, { AxiosRequestConfig } from 'axios';
import { WEATHER_BASE_URL } from '../common/constants';
import { IGeolocation } from '../common/interfaces/geolocation.interface';

const httpClient = axios.create();
const apiKey: string = process.env.WEATHER_API_KEY.replace('\r', '');

export const initRequestHeader = (config: AxiosRequestConfig) => {
  config.baseURL = WEATHER_BASE_URL;
  config.params.appid = apiKey;
  return config;
};

httpClient.interceptors.request.use(initRequestHeader);

export const fetchWeatherForecast = ({ lat, lon }: IGeolocation) => {
  return httpClient.get('/onecall', {
    params: {
      lat,
      lon,
      units: 'metric',
      exclude: 'current,minutely,hourly',
    },
  });
};
