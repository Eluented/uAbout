import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import App from './App';
import store from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  < Router>
      <React.StrictMode>
          <Provider store={store}>
              <App />
          </Provider>
      </React.StrictMode>
  </Router>
);