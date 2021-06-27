import React from 'react';
import { IGeolocation } from '../common/interfaces/geolocation.interface';

export const GeoQueryContext = React.createContext<IGeoQueryContext | null>(
  null
);

export interface IGeoQueryAction {
  type: string;
  value: IGeolocation;
}

export interface IGeoQueryContext {
  state: IGeoQueryState;
  dispatch: React.Dispatch<IGeoQueryAction>;
}

export interface IGeoQueryState {
  query: IGeolocation | null;
}

function geoQueryReducer(state: IGeoQueryState, action: IGeoQueryAction) {
  switch (action.type) {
    case 'set': {
      return { query: action.value };
    }
    case 'clear': {
      return { query: null };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function GeoQueryProvider({ children }) {
  const [state, dispatch] = React.useReducer(geoQueryReducer, { query: null });
  const value = { state, dispatch };
  return (
    <GeoQueryContext.Provider value={value}>
      {children}
    </GeoQueryContext.Provider>
  );
}
