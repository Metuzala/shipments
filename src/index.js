import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../src/css/material-dashboard.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store/configureStore';
import { loadShipments } from './store/shipmentsSlice';

store.dispatch(loadShipments());

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
