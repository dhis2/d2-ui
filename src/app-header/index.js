import React from 'react';
import { render } from 'react-dom';
import { init } from 'd2/lib/d2';
import HeaderBar from './HeaderBar';

global.jQuery.ajaxSetup({
    headers: {
        Authorization: DHIS_CONFIG.authorization,
    },
});

export default function initHeaderBar(domElement) {
    init({ baseUrl: DHIS_CONFIG.baseUrl + '/api', noSchemas: true })
        .then((d2) => {
            const HeaderBarWithContext = React.createClass({
                childContextTypes: {
                    d2: React.PropTypes.object,
                },

                getChildContext() {
                    return {
                        d2: d2,
                    };
                },

                render() {
                    return (
                        <HeaderBar />
                    );
                },
            });

            render(<HeaderBarWithContext />, domElement);
        });
}
