import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';

// import App from './shared/App';

import 'typeface-roboto';
import 'react-app-polyfill/ie11';

// import { theme } from './index.styles';

ReactDOM.render(
    // <MuiThemeProvider theme={theme}>
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
        <CssBaseline />
        <HashRouter basename="/">
            {/* <App /> */}
            HOLA!
            </HashRouter >
    </MuiPickersUtilsProvider>
    // </MuiThemeProvider>
    ,
    document.getElementById('root')
);
