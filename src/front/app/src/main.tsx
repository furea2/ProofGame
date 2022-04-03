import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { inDev } from './utils/helpers';

console.log('[SYSTEM] : app started');

const app = <App/>;

ReactDOM.render(app, document.getElementById('app'));

if (inDev() && module.hot) module.hot.accept();
