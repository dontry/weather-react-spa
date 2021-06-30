import { IForecast } from './forecast.interface';

export interface IForecastResponse {
  lat: number;
  lon: number;
  timezone: string;
  daily: IForecast[];
}
