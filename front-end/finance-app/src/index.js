import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reducer  from './Components/Login_Page/Login_Components/config/Reducer';
import { legacy_createStore } from 'redux';
import { Provider } from 'react-redux';

const store = legacy_createStore(reducer)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
