
import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500, blue700, lightBlack, grey300, grey500, white, darkBlack } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';
import D2Lib from 'd2/lib/d2';
import injectTapEventPlugin from 'react-tap-event-plugin';
import '../../scss/DataTable.scss';
import Legend from '../../src/legend/Legend.component';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

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

const baseUrl = `${DHIS_CONFIG.baseUrl}/api`;
D2Lib.config.baseUrl = baseUrl;

function renderExamples(d2) {
    class Example extends React.Component {
        constructor() {
            super();


            d2.i18n.translations['start_value'] = 'start value';
            d2.i18n.translations['end_value'] = 'end value';
            d2.i18n.translations['name'] = 'name';
            d2.i18n.translations['organisation_unit_counts'] = 'organisation unit counts';
            d2.i18n.translations['color'] = 'color';

            d2.i18n.translations['create_legend_items'] = 'Create legend items';
            d2.i18n.translations['number_of_items'] = 'number of items';

            d2.i18n.translations['edit'] = 'edit';
            d2.i18n.translations['delete'] = 'delete';
            d2.i18n.translations['actions'] = 'actions';

            const model = d2.models.legendSet.create({
                id: 'fqs276KXCXi',
                name: 'ANC Coverage',
                legends: [{
                    name: 'Medium Plus',
                    id: 'Pn6IoBWiJpe',
                    endValue: 70.0,
                    color: '#FF6600',
                    startValue: 60.0,
                    attributeValues: [],
                }, {
                    name: 'Low',
                    id: 'lrs5w0hTJtE',
                    endValue: 40.0,
                    color: '#FF0000',
                    startValue: 0.0,
                    attributeValues: [],
                }, {
                    name: 'Medium',
                    id: 'QokQceufnau',
                    endValue: 60.0,
                    color: '#993300',
                    startValue: 40.0,
                    attributeValues: [],
                }, {
                    name: 'High Plus',
                    id: 'JVBtpZGG2Rh',
                    endValue: 90.0,
                    color: '#339966',
                    startValue: 80.0,
                    attributeValues: [],
                }, {
                    name: 'High',
                    id: 'epVTNHmMDlk',
                    endValue: 80.0,
                    color: '#99CC00',
                    startValue: 70.0,
                    attributeValues: [],
                }, {
                    name: 'Great',
                    id: 'VwpNfwNQX3m',
                    endValue: 120.0,
                    color: '#00FF00',
                    startValue: 90.0,
                    attributeValues: [],
                }, {
                    name: 'Invalid',
                    id: 'Va71FXFjb4w',
                    endValue: 990.0,
                    color: '#99CCFF',
                    startValue: 120.0,
                    attributeValues: [],
                }],
            });
            this.state = {
                items: model.legends,
            };
        }

        getChildContext() {
            return { muiTheme: getMuiTheme(style), d2 };
        }

        onItemsChange = (newItems) => {
            this.setState({ items: newItems });
        }

        render() {
            return <Legend items={this.state.items} onItemsChange={this.onItemsChange} />;
        }
    }

    Example.childContextTypes = {
        muiTheme: PropTypes.object,
        d2: PropTypes.object,
    };

    const app = (
        <Example />
    );
    render(app, document.getElementById('app'));
}

D2Lib.init({ baseUrl }).then(renderExamples);
