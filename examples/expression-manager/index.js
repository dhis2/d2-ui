import React from 'react';
import { render } from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500, blue700, lightBlack, grey300, grey500, white, darkBlack } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';
import D2Lib from 'd2/lib/d2';
import Store from '../../src/store/Store';
import ExpressionManager from '../../src/indicator-expression-manager/IndicatorExpressionManager.component';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

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

    const store = Store.create();

    const app = (
        <Example>
            <ExpressionManager
                titleText="My indicator expression manager"
                descriptionLabel="description"
                expressionStatusStore={store}
                indicatorExpressionChanged={(...args) => console.log(args)}
                descriptionValue=""
                formulaValue=""
            />
        </Example>
    );
    render(app, document.getElementById('expression-manager'));
}

const baseUrl = `${dhisDevConfig.baseUrl}/api`;

D2Lib.config.baseUrl = baseUrl;
D2Lib.init({ baseUrl }).then(renderExamples);
