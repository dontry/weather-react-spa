import React, { memo } from 'react';
import { Typography, makeStyles, Card, ListItem } from '@material-ui/core';

import { IWeatherInfo } from '../../common/interfaces/weather-info.interface';

const useStyles = makeStyles({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    width: '100%',
  },
  card: {
    width: '100%',
    padding: '0.5rem 1rem',
  },
  container: {
    display: 'flex',
    flexGrow: 1,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '2rem',
    justifyContent: 'center',
  },
  tempList: {
    listStyleType: 'none',
    paddingInlineStart: '0.25em',
  },
});

export const ResultItem = memo(
  ({ date, day, minTemp, maxTemp, weather }: IWeatherInfo) => {
    const classes = useStyles();
    return (
      <ListItem key={date} className={classes.root}>
        <Card className={classes.card}>
          <div className={classes.container}>
            <div className={classes.section}>
              <Typography component="h3" variant="h4" color="textPrimary">
                {weather}
              </Typography>
              <ul className={classes.tempList}>
                <li>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    min: {minTemp}°C{' '}
                  </Typography>
                </li>
                <li>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    max: {maxTemp}°C
                  </Typography>
                </li>
              </ul>
            </div>
            <div className={classes.section}>
              <Typography component="h4" variant="h5">
                {day}
              </Typography>
              <Typography component="h6" variant="h6">
                {date}
              </Typography>
            </div>
          </div>
        </Card>
      </ListItem>
    );
  }
);
