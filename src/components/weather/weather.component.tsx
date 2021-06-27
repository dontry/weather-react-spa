import { useContext } from 'react';
import { GeoQueryContext } from '../../context/geo-query.context';

export const Weather = () => {
  const geoQuery = useContext(GeoQueryContext);
  const query = geoQuery.state.query;
};
