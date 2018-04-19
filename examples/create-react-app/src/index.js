import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { init } from 'd2/lib/d2'

let baseUrl = process.env.REACT_APP_DHIS2_BASE_URL
if (!baseUrl) {
	console.warn('Set the environment variable `REACT_APP_DHIS2_BASE_URL` to your DHIS2 instance to override localhost:8080!')
	baseUrl = 'http://localhost:8080'
}

init({
    baseUrl: baseUrl + '/api/29'
}).then(d2 => {
    console.log(d2)
    ReactDOM.render(<App d2={d2}/>, document.getElementById('root'));
    registerServiceWorker();
}).catch(e => console.error)

