import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { init } from 'd2/lib/d2'

function injectScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.async = true;
        script.src = src;
        script.addEventListener('load', resolve);
        script.addEventListener('error', () => reject('Error loading script.'));
        script.addEventListener('abort', () => reject('Script loading aborted.'));
        document.head.appendChild(script);
    });
}

const ckeditorUrl = '/dhis-web-core-resource/ckeditor/4.6.1/ckeditor.js';
let baseUrl = process.env.REACT_APP_DHIS2_BASE_URL;

if (!baseUrl) {
    console.warn('Set the environment variable `REACT_APP_DHIS2_BASE_URL` to your DHIS2 instance to override localhost:8080!');
    baseUrl = 'http://localhost:8080';
}

const getD2$ = init({baseUrl: baseUrl + '/api/29'});
const ckeditorScript$ = injectScript(baseUrl + ckeditorUrl);

Promise.all([getD2$, ckeditorScript$])
    .then(([d2, ckeditorScript]) => {
        ReactDOM.render(<App d2={d2}/>, document.getElementById('root'));
        registerServiceWorker();
    })
    .catch(err => console.error(err));
