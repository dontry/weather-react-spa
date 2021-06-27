import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useContext,
} from 'react';
import { TextField, CircularProgress } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import * as LocationService from '../../services/location.service';
import * as WeatherService from '../../services/weather.service';
import { ILocation } from '../../common/interfaces/location.interface';
import { debounce } from 'lodash-es';
import { AxiosResponse } from 'axios';
import { IGeolocation } from '../../common/interfaces/geolocation.interface';
import { ForecastContext } from '../../context/forecast.context';
import { IForecastResponse } from '../../common/interfaces/forecast-response.interfact';

const SEARCHBAR_LABEL = 'Enter a location';

export const SearchBar = () => {
  const forecastContext = useContext(ForecastContext);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ILocation[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const loading = open && options.length === 0;

  const renderInput = useCallback(
    (params) => (
      <TextField
        {...params}
        label={SEARCHBAR_LABEL}
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
        LocationService.fetchLocations(inputValue).then(callback);
      }, 200),
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
  }, [loading, fetchLocations, inputValue]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

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
          .catch(() => {});
      }
    },
    [forecastContext]
  );

  const handleInputChange = useCallback(
    (event, newInputValue) => {
      setInputValue(newInputValue);
      if (newInputValue === '') {
        forecastContext?.dispatch({ type: 'clear' });
      }
    },
    [forecastContext]
  );

  return (
    <Autocomplete
      style={{ width: 500 }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionSelected={(option: ILocation, value: ILocation) =>
        option.place_id === value.place_id
      }
      getOptionLabel={(option: ILocation) => option.display_name}
      options={options}
      loading={loading}
      renderInput={renderInput}
      onChange={handleOptionSelect}
      onInputChange={handleInputChange}
    />
  );
};
