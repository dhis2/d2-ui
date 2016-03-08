import React from 'react/addons';
import FormBuilder from '../../src/forms/FormBuilder.component';
import { shallow } from 'enzyme';
import { getStubContext } from '../../config/inject-theme';

class TextField extends React.Component {
    render() {
        return (<input {...this.props} />);
    }
}

function getSystemSettingsFormConfig() {
    const systemSettings = {
        keyEmailPort: 587,
        keyEmailTls: true,
        keyCalendar: 'iso8601',
        SMS_CONFIG: {},
        orgUnitGroupSetAggregationLevel: 3,
        omitIndicatorsZeroNumeratorDataMart: false,
        keyScheduledPeriodTypes: [],
    };

    // TODO: Not valid syntax for FormBuilder
    const fieldConfigs = [
        {
            name: 'keyEmailPort',
            type: TextField,
            fieldOptions: {
                floatingLabelText: 'keyEmailPort',
            },
        },
        {
            name: 'keyEmailTls',
            type: TextField,
        },
        {
            name: 'keyCalendar',
            type: TextField,
        },
    ];

    return { systemSettings, fieldConfigs };
}

xdescribe('FormBuilder component', () => {
    let formComponent;
    const renderComponent = (props, children) => {
        return shallow(<FormBuilder {...props}>{children}</FormBuilder>, {
            context: getStubContext(),
        });
    };

    beforeEach(() => {
        formComponent = renderComponent({ fields: [], onUpdateField: () => {} });
    });

    it('has no tests yet', () => {
    });
});
