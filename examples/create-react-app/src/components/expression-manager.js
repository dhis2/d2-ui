import React from 'react';
import PropTypes from 'prop-types';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue500, blue700, lightBlack, grey300, grey500, white, darkBlack } from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import Spacing from 'material-ui/styles/spacing';

import { Store } from 'd2-ui';
import { ExpressionManager } from 'd2-ui';

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

const store = Store.create();

export default class Example extends React.Component {
    constructor(props) {
        super(props);

        let d2 = this.props.d2;

        d2.i18n.translations['search_by_name'] = 'Search by name';
        d2.i18n.translations['field_is_required'] = 'Field is required';
        d2.i18n.translations['organisation_unit_counts'] = 'Org Unit Counts';
        d2.i18n.translations['please_select_a_program'] = 'Please select a program';
        d2.i18n.translations['reporting_rates'] = 'Reporting rates';

        d2.i18n.translations['program_data_elements'] = 'Program data elements';
        d2.i18n.translations['program_tracked_entity_attributes'] = 'Program tracked entity attributes';
        d2.i18n.translations['program_indicators'] = 'Program indicators';

        d2.i18n.translations['no_program_indicators'] = 'No program indicators for this program';
        d2.i18n.translations['no_tracked_entity_attributes'] = 'No tracked entity attributes for this program';
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(style), d2: this.props.d2 };
    }

    render() {
        return (<ExpressionManager
            titleText="My indicator expression manager"
            descriptionLabel="description"
            expressionStatusStore={store}
            expressionChanged={value => ({ ...value })}
            descriptionValue=""
            formulaValue=""
        />)
    }
}

Example.propTypes = {
    d2: PropTypes.object.isRequired,
};

Example.childContextTypes = {
    muiTheme: PropTypes.object,
    d2: PropTypes.object,
};
