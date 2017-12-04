import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500, blue700, lightBlack, grey300, grey500, white, darkBlack } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';
import FormulaEditor from '../../src/formula-editor';

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
function renderExamples() {
    class Example extends React.Component {
        getChildContext() {
            return {
                muiTheme: getMuiTheme(style),
            };
        }

        render() {
            return this.props.children;
        }
    }
    Example.childContextTypes = {
        muiTheme: PropTypes.object,
    };

    const app = (
        <Example>
            <FormulaEditor />
        </Example>
    );
    render(app, document.getElementById('formulaEditor'));
}

renderExamples();
