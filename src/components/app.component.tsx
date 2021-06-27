import '../styles.css';
import { SearchBar } from './search-bar/search-bar.component';
import { GeoQueryProvider } from '../context/geo-query.context';

export function App() {
  return (
    <GeoQueryProvider>
      <div className="App">
        <SearchBar />
      </div>
    </GeoQueryProvider>
  );
}
