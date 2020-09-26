import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { ConfirmProvider } from "material-ui-confirm";
import { ptBR } from '@material-ui/core/locale';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import * as serviceWorker from './serviceWorker';

import App from './App';
import config from "./config/config";

import { store } from "./helpers";

import axios from 'axios'

axios.defaults.baseURL = config.apiUrl
const theme = createMuiTheme({
  palette: {
    primary: { main: '#1976d2' },
  },
}, ptBR);



ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConfirmProvider>
        <App />

      </ConfirmProvider>
    </ThemeProvider>

  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
