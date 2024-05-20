import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './containers/App';
import { DataProvider } from './context/dataContext';
import { FiltersProvider } from './context/filtersContext';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <FiltersProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </FiltersProvider>
  </React.StrictMode>
);

