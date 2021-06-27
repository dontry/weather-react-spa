import { StrictMode } from 'react';
import { render } from 'react-dom';

import { App } from './components/app.component';

const rootElement = document.getElementById('root');
render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
