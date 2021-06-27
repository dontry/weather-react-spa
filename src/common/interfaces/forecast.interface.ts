import { ITemperature } from './temperature-details.interface';
import { IWeather } from './weather.interface';

export interface IForecast {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: ITemperature;
  weather: IWeather[];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
}
