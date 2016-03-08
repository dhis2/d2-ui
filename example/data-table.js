import React from 'react';
import {render} from 'react-dom';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import {init, getInstance, config} from 'd2/lib/d2';

import DataTable from '../src/data-table/DataTable.component';

const style = {
    spacing: Spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: Colors.blue500,
        primary2Color: Colors.blue700,
        primary3Color: Colors.lightBlack,
        accent1Color: '#276696',
        accent2Color: '#E9E9E9',
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.white,
        borderColor: Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    },
};

function renderExamples(d2) {
    class Example extends React.Component {
        getChildContext() {
            return {
                muiTheme: ThemeManager.getMuiTheme(style),
                d2: d2,
            };
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
        {firstName: 'Mark', lastName: 'Polak'},
        {firstName: 'Nicolay', lastName: 'Ramm'},
    ];

    const cma = {

    };

    const app = (
        <Example>
            <DataTable
                columns={['firstName', 'lastName']}
                rows={myRows}
                contextMenuActions={cma}
            />
        </Example>
    );
    render(app, document.getElementById('data-table'));
}

jQuery.ajaxSetup({
    headers: {
        Authorization: 'Basic ' + btoa('admin:district'),
    },
});


init({baseUrl: 'http://localhost:8080/dhis/api'}).then(renderExamples);
