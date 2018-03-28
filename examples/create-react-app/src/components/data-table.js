import React from 'react';
import PropTypes from 'prop-types';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500, blue700, lightBlack, grey300, grey500, white, darkBlack } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';

import DataTable from 'd2-ui-datatable';
import 'd2-ui/lib/css/DataTable.css';

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

export default class Example extends React.Component {
    getChildContext() {
        return { muiTheme: getMuiTheme(style), d2: this.props.d2 };
    }

    render() {
        return (
            <div>
                <DataTable
                    columns={['firstName', 'lastName', 'lastUpdated']}
                    rows={myRows}
                    contextMenuActions={multipleCma}
                />
                <DataTable
                    columns={['firstName', 'lastName', 'lastUpdated']}
                    rows={myRows}
                    contextMenuActions={singleCma}
                    contextMenuIcons={{ edit: 'edit' }}
                />
                <DataTable
                    columns={['firstName', 'lastName', 'lastUpdated']}
                    rows={myRows}
                    contextMenuActions={emptyCma}
                />
            </div>
        );
    }
}

Example.childContextTypes = {
    muiTheme: PropTypes.object,
    d2: PropTypes.object,
};

Example.propTypes = {
    d2: PropTypes.object.isRequired,
};

const myRows = [
    { firstName: 'John', lastName: 'Traore', lastUpdated: '2014-11-11T21:56:05.469' },
    { firstName: 'Tom', lastName: 'Wakiki', lastUpdated: '2015-08-06T13:28:05.512' },
];

const multipleCma = {
    edit(...args) {
        console.log('Edit', ...args);
    },
    remove(...args) {
        console.log('Remove', ...args);
    },
};

const singleCma = {
    edit(...args) {
        console.log('Edit', ...args);
    },
};

const emptyCma = {};
