import React, { useCallback } from 'react';
import { TextField, CircularProgress } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { fetchLocations } from '../../services/location.service';
import { ILocation } from '../../common/interfaces/location.interface';
import { debounce } from 'lodash-es';
import { AxiosResponse } from 'axios';
import { GeoQueryContext } from '../../context/geo-query.context';

const SEARCHBAR_LABEL = 'Enter a location';

export const SearchBar = () => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<ILocation[]>([]);
  const [inputValue, setInputValue] = React.useState('');
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

  const fetch = React.useMemo(
    () =>
      debounce((inputValue: string, callback: any) => {
        fetchLocations(inputValue).then(callback);
      }, 200),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!loading || inputValue === '') {
      return undefined;
    }

    fetch(inputValue, (response: AxiosResponse<any>) => {
      const locations: ILocation[] = response.data;
      if (active) {
        setOptions(locations);
      }
    });

    return () => {
      active = false;
    };
  }, [loading, fetch, inputValue]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const geoQuery = React.useContext(GeoQueryContext);

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
      onChange={(event, newValue) => {
        if (newValue) {
          geoQuery!.dispatch({
            type: 'set',
            value: { lat: newValue!.lat, lon: newValue!.lon },
          });
        }
        console.log({ value: newValue });
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
    />
  );
};
