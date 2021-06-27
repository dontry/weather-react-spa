import React, { useReducer, createContext } from 'react';
import { IForecast } from '../common/interfaces/forecast.interface';

export const ForecastContext = createContext<IForecastContext | null>(null);

export type ForecastActionType = 'set' | 'clear';

export interface IForecastAction {
  type: ForecastActionType;
  value?: IForecast[];
}

export interface IForecastContext {
  state: IForecastState;
  dispatch: React.Dispatch<IForecastAction>;
}

export interface IForecastState {
  forecasts?: IForecast[];
}

function forecastReducer(state: IForecastState, action: IForecastAction) {
  console.log({ state, action });
  switch (action.type) {
    case 'set': {
      return { ...state, forecasts: action.value };
    }
    case 'clear': {
      return { ...state, forecasts: [] };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function ForecastProvider({ children }: any) {
  const [state, dispatch] = useReducer(forecastReducer, {
    forecasts: [],
  });
  const value = { state, dispatch };
  return (
    <ForecastContext.Provider value={value}>
      {children}
    </ForecastContext.Provider>
  );
}
