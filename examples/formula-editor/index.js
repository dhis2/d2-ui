import React from 'react';
import {render} from 'react-dom';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';

import FormulaEditor from '../../src/formula-editor';


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

function renderExamples() {
    class Example extends React.Component {
        getChildContext() {
            return {
                muiTheme: ThemeManager.getMuiTheme(style),
            };
        }

        render() {
            return this.props.children;
        }
    }
    Example.childContextTypes = {
        muiTheme: React.PropTypes.object,
    };

    const app = (
        <Example>
            <FormulaEditor />
        </Example>
    );
    render(app, document.getElementById('formulaEditor'));
}

// jQuery.ajaxSetup({
//     headers: {
//         Authorization: 'Basic ' + btoa('admin:district'),
//     },
// });


renderExamples();

// init({baseUrl: 'http://localhost:8080/dhis/api'}).then(renderExamples);
