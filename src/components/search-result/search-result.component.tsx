import React from 'react';
import { makeStyles, Typography, Container, List } from '@material-ui/core';
import { ResultItem } from './result-item.component';
import { useHandleResultUpdate } from './search-result.hooks';

const useStyles = makeStyles({
  container: {
    marginTop: '1rem',
    paddingLeft: 0,
  },
});

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
