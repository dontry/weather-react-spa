import { useContext, useMemo } from 'react';
import { IForecast } from '../../common/interfaces/forecast.interface';
import { ForecastContext } from '../../context/forecast.context';
import { IWeatherInfo } from '../../common/interfaces/weather-info.interface';
import { formatDate } from '../../common/utils/format-date';
import { WEEKDAYS } from '../../common/constants';

function transformWeatherInfo(data: IForecast): IWeatherInfo {
  const datetime = new Date(data.dt * 1000);
  const date = formatDate(datetime);
  const day = WEEKDAYS[datetime.getDay()];
  const minTemp = data.temp.min;
  const maxTemp = data.temp.max;
  const weather = data.weather.main;
  return {
    date,
    day,
    minTemp,
    maxTemp,
    weather,
  };
}

export const useHandleResultUpdate = () => {
  const forecastContext = useContext(ForecastContext);
  const forecasts = forecastContext?.state.forecasts;
  const result = useMemo(() => forecasts.map(transformWeatherInfo), [
    forecasts,
  ]);

  return { result };
};
