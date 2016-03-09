import React from 'react';
import { render } from 'react-dom';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import { init, getInstance } from 'd2/lib/d2';

import DataTable from '../../src/data-table/DataTable.component';

import '../../scss/DataTable.scss';

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

const el = document.getElementById('data-table');
const baseUrl = 'https://play.dhis2.org/dev/api';

function renderExamples(d2) {
    class Example extends React.Component {
        getChildContext() {
            return {
                muiTheme: ThemeManager.getMuiTheme(style),
                d2,
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
    Example.propTypes = {
        children: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.object,
        ]),
    };

    const myRows = [
        { firstName: 'Mark', lastName: 'Polak' },
        { firstName: 'Nicolay', lastName: 'Ramm' },
    ];

    const cma = {};

    const app = (
        <Example>
            <DataTable
                columns={['firstName', 'lastName']}
                rows={myRows}
                contextMenuActions={cma}
            />
        </Example>
    );
    render(app, el);
}

function SimpleMessage(props) {
    return (<div>{props.message.trim().split('\n').map((line, lineNo) => <div key={lineNo} style={{ minHeight: '1rem' }}>{line}</div>)}</div>);
}
SimpleMessage.propTypes = { message: React.PropTypes.string.isRequired };

jQuery.ajaxSetup({ headers: { Authorization: 'Basic YWRtaW46ZGlzdHJpY3Q=' } });

render(<SimpleMessage message={`Initializing D2 with DHIS 2 server: ${baseUrl} ...`} />, el);

init({ baseUrl })
    .then(renderExamples)
    .catch(err => {
        render(<SimpleMessage message={`
        Error: ${err}

        Check your configuration:
        - DHIS2 server address (${baseUrl})
        - Authentication credentials
        - CORS whitelist`}
        />, el);
    });
