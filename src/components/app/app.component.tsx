import { makeStyles, Typography, Container } from '@material-ui/core';
import { SearchBar } from '../search-bar/search-bar.component';
import { SearchResult } from '../search-result/search-result.component';
import { ForecastProvider } from '../../context/forecast.context';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'sans-serif',
    textAlign: 'center',
    marginTop: '2rem',
    width: '680px',
  },
  header: {
    marginBottom: '1rem',
  },
});

export function App() {
  const classes = useStyles();
  return (
    <ForecastProvider>
      <Container className={classes.container}>
        <Typography component="h1" variant="h4" className={classes.header}>
          Weather Forecast
        </Typography>
        <SearchBar />
        <SearchResult />
      </Container>
    </ForecastProvider>
  );
}
