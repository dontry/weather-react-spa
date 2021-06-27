import React from 'react';
import { Autocomplete } from '@material-ui/lab';
import { ILocation } from '../../common/interfaces/location.interface';
import { useHandleOptions, useHandleInputField } from './search-bar.hooks';

export const SearchBar = () => {
  const {
    options,
    open,
    loading,
    setOpen,
    setOptions,
    handleOptionSelect,
  } = useHandleOptions();
  const { renderInput, handleInputChange } = useHandleInputField(
    loading,
    setOptions
  );

  return (
    <Autocomplete
      style={{ width: '100%' }}
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
