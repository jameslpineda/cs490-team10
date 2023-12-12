import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

import { store } from './app/store';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const container: any = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    ,
  </React.StrictMode>,
);
