import { ForecastContext, ForecastProvider } from '../../context/forecast.context';
import { renderHook, act } from '@testing-library/react-hooks';
import { useHandleInputField, useHandleOptions } from './search-bar.hooks';
import { fetchLocations } from '../../services/location.service';
import { fetchWeatherForecast } from '../../services/weather.service';
import { mockLocations } from '../../common/mocks/location.mock';
import { mockWeatherForecast } from '../../common/mocks/weather-forecast.mock';
import { Dispatch, SetStateAction } from 'react';
import { ILocation } from '../../common/interfaces/location.interface';
import _ from 'lodash-es'
import { AxiosResponse } from 'axios';
import { sleep } from '../../common/utils/sleep';

jest.mock('lodash-es');
jest.mock('../../services/location.service');
jest.mock('../../services/weather.service');

const mockLodash = _ as jest.Mocked<typeof _>;
const mockFetchLocations = fetchLocations as jest.MockedFunction<typeof fetchLocations>;
const mockFetchWeatherForecast = fetchWeatherForecast as jest.MockedFunction<typeof fetchWeatherForecast>;

describe('search-bar hooks', () => {
	let mockSetOption: jest.Mock<Dispatch<SetStateAction<ILocation[]>>>;
	beforeEach(() => {
		mockSetOption = jest.fn();
	})

	describe('useHandleInputField()', () => {
		it('should create renderInput & handleInputChange function', () => {
			const wrapper = ({ children }: any) => <ForecastProvider value={null} >{children}</ForecastProvider>
			const { result } = renderHook(() => useHandleInputField(false, mockLocations, mockSetOption), { wrapper });

			expect(result.current.renderInput).toBeInstanceOf(Function);
			expect(result.current.handleInputChange).toBeInstanceOf(Function);
		});

		describe('when inputValue is updated and loading is true', () => {
			it('should call fetchLocations & setOptions', () => {
				mockLodash.debounce.mockImplementation(cb => cb.apply(this));
				mockFetchLocations.mockResolvedValue({ data: mockFetchLocations } as AxiosResponse);
				const wrapper = ({ children }: any) => <ForecastProvider>{children}</ForecastProvider>
				const { result, waitForNextUpdate } = renderHook(() => useHandleInputField(true, [], mockSetOption), { wrapper });
				act(() => {
					result.current.handleInputChange(null, 'new locations');
				})
				waitForNextUpdate();
				expect(mockFetchLocations).toHaveBeenCalled();
			});
		})
	})

	describe('useHandleOptions', () => {
		it('should call fetchWeatherForecast when option is selected', async () => {
			mockFetchWeatherForecast.mockResolvedValue({ data: { daily: mockWeatherForecast } } as AxiosResponse);
			const mockDispatch = jest.fn();
			const wrapper = ({ children }: any) => <ForecastContext.Provider value={{ state: { forecasts: [] }, dispatch: mockDispatch }}>{children}</ForecastContext.Provider>
			const { result } = renderHook(() => useHandleOptions(), { wrapper });
			act(() => {
				result.current.handleOptionSelect(null, { lat: 100, lon: 100 });
			});
			await sleep(100);
			expect(mockFetchWeatherForecast).toHaveBeenCalled();
			expect(mockDispatch).toHaveBeenCalled();
		});
	});
});
