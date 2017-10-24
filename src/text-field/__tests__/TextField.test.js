import React from 'react';
import { shallow } from 'enzyme';
import MuiTextField from 'material-ui/TextField';
import { getStubContext } from '../../../config/inject-theme';
import TextField from '../TextField';

describe('TextField', () => {
    const renderWithProps = (props) => shallow(<TextField {...props} />, {
        context: getStubContext(),
    });

    it('should render a MUI TextField', () => {
        expect(renderWithProps({}).type()).toBe(MuiTextField);
    });



});
