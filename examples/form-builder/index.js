import React from 'react';
import {render} from 'react-dom';

import FormBuilder from '../../src/forms/FormBuilder.component.js';

import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';

import CheckBox from '../../src/form-fields/check-box.js';
import SelectField from '../../src/form-fields/drop-down.js';
import FileUpload from '../../src/form-fields/file-upload.js';
import MultiToggle from '../../src/form-fields/multi-toggle.js';
import TextField from '../../src/form-fields/text-field.js';

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
				name: 'exampleFileUpload',
				component: FileUpload,
				props: {
					label: 'File Upload Example',
                    name: 'logo_banner',
                    value: false,
                    isEnabled: true,
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
