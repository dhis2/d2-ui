import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import React from 'react';
import {render} from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500, blue700, lightBlack, grey300, grey500, white, darkBlack } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';
import D2Lib from 'd2/lib/d2';
import '../../scss/DataTable.scss';

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

import Legend from '../../src/legend/Legend.component';

const baseUrl = `${DHIS_CONFIG.baseUrl}/api`;

D2Lib.config.baseUrl = baseUrl;
D2Lib.init({ baseUrl }).then(renderExamples);

function renderExamples(d2) {
    class Example extends React.Component {
        constructor() {
            super();
            const model = d2.models.legendSet.create({
                "id": "fqs276KXCXi",
                "name": "ANC Coverage",
                "legends": [{
                    "name": "Medium Plus",
                    "id": "Pn6IoBWiJpe",
                    "endValue": 70.0,
                    "color": "#FF6600",
                    "startValue": 60.0,
                    "attributeValues": []
                }, {
                    "name": "Low",
                    "id": "lrs5w0hTJtE",
                    "endValue": 40.0,
                    "color": "#FF0000",
                    "startValue": 0.0,
                    "attributeValues": []
                }, {
                    "name": "Medium",
                    "id": "QokQceufnau",
                    "endValue": 60.0,
                    "color": "#993300",
                    "startValue": 40.0,
                    "attributeValues": []
                }, {
                    "name": "High Plus",
                    "id": "JVBtpZGG2Rh",
                    "endValue": 90.0,
                    "color": "#339966",
                    "startValue": 80.0,
                    "attributeValues": []
                }, {
                    "name": "High",
                    "id": "epVTNHmMDlk",
                    "endValue": 80.0,
                    "color": "#99CC00",
                    "startValue": 70.0,
                    "attributeValues": []
                }, {
                    "name": "Great",
                    "id": "VwpNfwNQX3m",
                    "endValue": 120.0,
                    "color": "#00FF00",
                    "startValue": 90.0,
                    "attributeValues": []
                }, {
                    "name": "Invalid",
                    "id": "Va71FXFjb4w",
                    "endValue": 990.0,
                    "color": "#99CCFF",
                    "startValue": 120.0,
                    "attributeValues": []
                }]
            });

            this.state = {
                items: model.legends.toArray(),
            };

            this.onItemsChange = this.onItemsChange.bind(this);
        }

        getChildContext() {
            return { muiTheme: getMuiTheme(style), d2 };
        }

        onItemsChange(items) {
            const newLegends = items.map(item => d2.models.legend.create(item));

            this.setState({items: newLegends});
        }

        render() {
            return <Legend items={this.state.items} onItemsChange={this.onItemsChange} />;
        }
    }
    Example.childContextTypes = {
        muiTheme: React.PropTypes.object,
        d2: React.PropTypes.object,
    };

    const app = (
        <Example />
    );
    render(app, document.getElementById('app'));
}
