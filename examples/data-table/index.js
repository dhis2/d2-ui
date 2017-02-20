import React from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500, blue700, lightBlack, grey300, grey500, white, darkBlack } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';
import D2Lib from 'd2/lib/d2';

import DataTable from '../../src/data-table/DataTable.component';
import '../../scss/DataTable.scss';

const dhisDevConfig = DHIS_CONFIG;

const style = {
    spacing: Spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: blue500,
        primary2Color: blue700,
        primary3Color: lightBlack,
        accent1Color: '#276696',
        accent2Color: '#E9E9E9',
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
    },
};

function renderExamples(d2) {
    class Example extends React.Component {
        getChildContext() {
            return { muiTheme: getMuiTheme(style), d2 };
        }

        render() {
            return this.props.children;
        }
    }
    Example.childContextTypes = {
        muiTheme: React.PropTypes.object,
        d2: React.PropTypes.object,
    };

    const myRows = [
        { firstName: 'John', lastName: 'Traore', lastUpdated: '2014-11-11T21:56:05.469' },
        { firstName: 'Tom', lastName: 'Wakiki', lastUpdated: '2015-08-06T13:28:05.512' },
    ];

    const cma = {
        edit: function (...args) {
            console.log('Edit', ...args);
        },
    };

    const app = (
        <Example>
            <DataTable
                columns={['firstName', 'lastName', 'lastUpdated']}
                rows={myRows}
                contextMenuActions={cma}
            />
        </Example>
    );
    render(app, document.getElementById('data-table'));
}

const baseUrl = `${dhisDevConfig.baseUrl}/api`;

D2Lib.config.baseUrl = baseUrl;
D2Lib.init({ baseUrl }).then(renderExamples);
