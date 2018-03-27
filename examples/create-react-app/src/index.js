import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { init } from 'd2/lib/d2'

init({ baseUrl: 'http://dhis2.vardevs.se/dev/api/29' }).then(d2 => {
    console.log(d2)
    ReactDOM.render(<App d2={d2}/>, document.getElementById('root'));
    registerServiceWorker();
}).catch(e => console.error)

