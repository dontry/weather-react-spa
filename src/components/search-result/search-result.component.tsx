import React from 'react';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import { ResultItem } from './result-item.component';
import { useHandleResultUpdate } from './search-result.hooks';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    marginTop: '1rem',
    paddingLeft: 0,
  },
});

const mockResult = [
  {
    date: '28/06/2021',
    day: 'Monday',
    minTemp: 22.78,
    maxTemp: 32.94,
    weather: 'Clear',
  },
  {
    date: '29/06/2021',
    day: 'Tuesday',
    minTemp: 22.21,
    maxTemp: 30.74,
    weather: 'Rain',
  },
  {
    date: '30/06/2021',
    day: 'Wednesday',
    minTemp: 23.07,
    maxTemp: 35.23,
    weather: 'Rain',
  },
  {
    date: '01/07/2021',
    day: 'Thursday',
    minTemp: 22.79,
    maxTemp: 33.94,
    weather: 'Cloud',
  },
  {
    date: '02/07/2021',
    day: 'Friday',
    minTemp: 24.28,
    maxTemp: 34.41,
    weather: 'Rain',
  },
  {
    date: '03/07/2021',
    day: 'Saturday',
    minTemp: 22.61,
    maxTemp: 30.53,
    weather: 'Snow',
  },
  {
    date: '04/07/2021',
    day: 'Sunday',
    minTemp: 22.18,
    maxTemp: 33.81,
    weather: 'Clear',
  },
];

export const SearchResult = () => {
  const classes = useStyles();
  const { result } = useHandleResultUpdate();
  return (
    <Container className={classes.container}>
      <Typography component="h2" variant="h6" align="left" gutterBottom>
        Forcast for next 7 days:
      </Typography>
      <List>
        {result.map((item) => (
          <ResultItem {...item} />
        ))}
      </List>
    </Container>
  );
};
