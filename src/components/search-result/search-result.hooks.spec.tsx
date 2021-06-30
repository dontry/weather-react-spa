import { ForecastContext } from '../../context/forecast.context';
import { mockWeatherForecast } from '../../common/mocks/weather-forecast.mock';
import { renderHook } from '@testing-library/react-hooks';
import { useHandleResultUpdate } from './search-result.hooks';


describe('search-result hooks', () => {
	describe('useHandleResultUpdate()', () => {
		it('should return search result', () => {
			const wrapper = ({ children }: any) => <ForecastContext.Provider value={{ state: { forecasts: mockWeatherForecast as any }, dispatch: () => { } }}>{children}</ForecastContext.Provider>
			const { result } = renderHook(() => useHandleResultUpdate(), { wrapper });
			expect(result.current.result.length).toEqual(mockWeatherForecast.length)
		});
	});
});
