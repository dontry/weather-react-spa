import './styles.css';
import Container from '@material-ui/core/Container';
import { SearchBar } from '../search-bar/search-bar.component';
import { SearchResult } from '../search-result/search-result.component';
import { ForecastProvider } from '../../context/forecast.context';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    fontFamily: 'sans-serif',
    textAlign: 'center',
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
