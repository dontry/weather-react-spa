import '../styles.css';
import { SearchBar } from './search-bar/search-bar.component';
import { SearchResult } from './search-result/search-result.component';
import { ForecastProvider } from '../context/forecast.context';

export function App() {
  return (
    <ForecastProvider>
      <div className="App">
        <SearchBar />
        <SearchResult />
      </div>
    </ForecastProvider>
  );
}
