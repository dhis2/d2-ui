import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import log from 'loglevel';

import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Card from 'material-ui/Card/Card';
import CardText from 'material-ui/Card/CardText';

import CheckBox from '../../src/form-fields/CheckBox.component';
import SelectField from '../../src/form-fields/DropDown.component';
import TextField from '../../src/form-fields/TextField';
import DatePicker from '../../src/form-fields/DatePicker.component';
import MultiToggle from '../../src/form-fields/MultiToggle';
import FormBuilder from '../../src/forms/FormBuilder.component';
import { isStartDateBeforeEndDate, isRequired } from '../../src/forms/Validators';

injectTapEventPlugin();

class FormExample extends React.Component {
    constructor() {
        super();
        this.onUpdateField = this.onUpdateField.bind(this);
    }

    getChildContext() {
        return {
            d2: {
                Api: {
                    getApi() {
                        return 'dummy_url';
                    },
                },
                i18n: {
                    getTranslation(key) {
                        return key;
                    },
                },
            },
        };
    }

    onUpdateField(fieldName, newValue) {
        log.info(fieldName, '=', newValue);
    }

    render() {
        const fields = [
            {
                name: 'exampleTextField',
                value: 'Default Value',
                component: TextField,
                props: {
                    floatingLabelText: 'Floating Label',
                    style: { width: '100%' },
                    hintText: 'Example hint text',
                    changeEvent: 'onBlur',
                },
                validators: [{
                    message: 'The field must have a value',
                    validator(value) {
                        return isRequired(value);
                    },
                }],
            },
            {
                name: 'exampleMultilineTextField',
                value: 'DHIS2',
                component: TextField,
                props: {
                    floatingLabelText: 'Multiline TextField',
                    style: { width: '100%' },
                    hintText: 'Press enter for new line',
                    multiLine: true,
                    changeEvent: 'onBlur',
                },
            },
            {
                name: 'exampleCheckBox',
                value: '',
                component: CheckBox,
                props: {
                    label: 'Checkbox Example',
                    style: { width: '100%' },
                    onCheck: (e, v) => {
                        this.onUpdateField('exampleCheckBox', v ? 'true' : 'false');
                    },
                },
            },
            {
                name: 'exampleDropDown',
                value: '1',
                component: SelectField,
                props: {
                    menuItems: [{ id: '1', displayName: 'Option 1' }, { id: '2', displayName: 'Option 2' }],
                    includeEmpty: false,
                    emptyLabel: 'No Options',
                },
            },
            {
                name: 'startDate',
                value: new Date(),
                component: DatePicker,
                props: {
                    floatingLabelText: 'Example Start Date Picker',
                    dateFormat: 'yyyy-MM-dd',
                    allowFuture: false,
                },
                validators: [{
                    message: 'Closed date cannot be before open date',
                    validator(value, formModel) {
                        return isStartDateBeforeEndDate(value, formModel.fields.endDate.value);
                    },
                }],
            },
            {
                name: 'endDate',
                value: new Date(),
                component: DatePicker,
                props: {
                    floatingLabelText: 'Example End Date Picker',
                    dateFormat: 'yyyy-MM-dd',
                    allowFuture: false,
                },
                validators: [{
                    message: 'Closed date cannot be before open date',
                    validator(value, formModel) {
                        return isStartDateBeforeEndDate(formModel.fields.startDate.value, value);
                    },
                }],
            },
            {
                name: 'exampleMultiToggle',
                value: '',
                component: MultiToggle,
                props: {
                    items: [
                        {
                            name: 'Monday',
                            value: true,
                            text: 'Monday is best',
                        },
                        {
                            name: 'Friday',
                            text: 'Friday is worst',
                        },
                    ],
                    label: 'Example of MultiToggle',
                    onChange: () => {},
                },
            },
        ];
        return (
            <Card>
                <CardText>
                    Example Form
                    <FormBuilder
                        fields={fields}
                        onUpdateField={this.onUpdateField}
                    />
                </CardText>
            </Card>
        );
    }
}

FormExample.childContextTypes = {
    d2: PropTypes.object,
};

render(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <FormExample />
    </MuiThemeProvider>,
    document.querySelector('#form-builder'),
);
