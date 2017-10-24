import React from 'react';
import { render } from 'react-dom';
import HeaderBar from './HeaderBar';
import withStateFrom from '../component-helpers/withStateFrom';
import headerBarStore$ from './headerBar.store';
import D2UIApp from '../app/D2UIApp';
import packageInfo from '../../package.json';

function getBaseUrl(predefLocation) {
    if (predefLocation) {
        return predefLocation;
    }

    return '../api';
}

export function initHeaderBar(domElement, apiLocation, config = {}) {
    const baseUrl = getBaseUrl(apiLocation);
    const { noLoadingIndicator, schemas = [], ...other } = config;
    const d2Config = {
        ...other,
        baseUrl,
        schemas,
    };

    console.log(`Initializing Header Bar v${packageInfo.version}`); // eslint-disable-line no-console
    const HeaderBarWithState = withStateFrom(headerBarStore$, HeaderBar);

    function HeaderBarWithContext() {
        return (
            <D2UIApp initConfig={d2Config}>
                <HeaderBarWithState noLoadingIndicator={noLoadingIndicator} />
            </D2UIApp>
        );
    }

    render(<HeaderBarWithContext />, domElement);
}

export default initHeaderBar;
