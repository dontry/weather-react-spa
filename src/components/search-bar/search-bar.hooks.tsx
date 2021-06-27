import {
  Dispatch,
  useState,
  useCallback,
  useEffect,
  useContext,
  SetStateAction,
  useMemo,
} from 'react';
import { TextField, CircularProgress } from '@material-ui/core';
import { ILocation } from '../../common/interfaces/location.interface';
import { ForecastContext } from '../../context/forecast.context';
import { IGeolocation } from '../../common/interfaces/geolocation.interface';
import { IForecastResponse } from '../../common/interfaces/forecast-response.interfact';
import * as LocationService from '../../services/location.service';
import * as WeatherService from '../../services/weather.service';
import { AxiosResponse } from 'axios';
import { debounce } from 'lodash-es';

const SEARCH_BAR_LABEL = 'Enter a location';
export const useHandleInputField = (
  loading: boolean,
  options: ILocation[],
  setOptions: Dispatch<SetStateAction<ILocation[]>>
) => {
  const forecastContext = useContext(ForecastContext);
  const [inputValue, setInputValue] = useState<string>('');
  const renderInput = useCallback(
    (params) => (
      <TextField
        {...params}
        label={SEARCH_BAR_LABEL}
        variant="outlined"
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              {params.InputProps.endAdornment}
            </>
          ),
        }}
      />
    ),
    [loading]
  );

  const fetchLocations = useMemo(
    () =>
      debounce((inputValue: string, callback: any) => {
        LocationService.fetchLocations(inputValue)
          .then(callback)
          .catch((error) => {
            alert(`Network error: ${error.message}`);
          });
      }, 1000),
    []
  );

  useEffect(() => {
    let active = true;

    if (!loading || inputValue === '') {
      return undefined;
    }

    fetchLocations(inputValue, (response: AxiosResponse<any>) => {
      const locations: ILocation[] = response.data;
      if (active) {
        setOptions(locations);
      }
    });

    return () => {
      active = false;
    };
  }, [loading, fetchLocations, inputValue, setOptions]);

  const handleInputChange = useCallback(
    (event, newInputValue) => {
      const isOptionValue = options.some(
        (option: ILocation) => option.display_name === newInputValue
      );
      if (isOptionValue) {
        return undefined;
      }
      console.log({ options, newInputValue });

      setInputValue(newInputValue);
      if (newInputValue === '') {
        forecastContext?.dispatch({ type: 'clear' });
        setOptions([]);
      }
    },
    [forecastContext, options, setOptions]
  );

  return { renderInput, handleInputChange };
};

export const useHandleOptions = () => {
  const forecastContext = useContext(ForecastContext);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ILocation[]>([]);
  const loading = useMemo(() => open && options.length === 0, [open, options]);

  const handleOptionSelect = useCallback(
    (event, value) => {
      if (value) {
        const geoValue: IGeolocation = {
          lat: value.lat,
          lon: value.lon,
        };
        WeatherService.fetchWeatherForecast(geoValue)
          .then((response) => {
            const data: IForecastResponse = response.data;
            const forecasts = data.daily.slice(1, data.daily.length);
            forecastContext?.dispatch({
              type: 'set',
              value: forecasts,
            });
          })
          .catch((error) => {
            alert(`Network error: ${error.message}`);
          });
      }
    },
    [forecastContext]
  );

  return { options, open, loading, setOpen, setOptions, handleOptionSelect };
};
