import React from 'react';
import {render} from 'react-dom';

import FormBuilder from '../../src/forms/FormBuilder.component.js';

import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';

import CheckBox from '../../src/form-fields/CheckBox.component.js';
import SelectField from '../../src/form-fields/DropDown.component.js';
import MultiToggle from '../../src/form-fields/MultiToggle.js';
import TextField from '../../src/form-fields/TextField.js';

class FormExample extends React.Component {
	constructor() {
		super();
		this._onUpdateField = this._onUpdateField.bind(this);
	}

	_onUpdateField(fieldName, newValue) {
		console.log(fieldName);
		console.log(newValue);
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
                        this._onUpdateField('exampleCheckBox', v ? 'true' : 'false');
                    },
                    changeEvent: 'onBlur',
                },
			},
            {
                name: 'exampleDropDown',
                value: "1",
                component: SelectField,
                props: {
                    menuItems: [{id:"1", displayName:"Option 1"}, {id:"2", displayName:"Option 2"}],
                    includeEmpty: false,
                    emptyLabel: "No Options"
                },
            },
		];
		return(
				<Card>
            <CardText>
                Example Form
                <FormBuilder
              		fields={fields} 
              		onUpdateField={this._onUpdateField}
                />
            </CardText>
        </Card>
			);
	}
}

FormExample.childContextTypes = {
    d2: React.PropTypes.object,
};

render(<FormExample /> , document.querySelector('#form-builder'));
