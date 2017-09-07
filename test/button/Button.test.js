import React from 'react';
import { shallow } from 'enzyme';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { getStubContext } from '../../config/inject-theme';
import Button from '../../src/button/Button.component';

describe('Button', () => {
    const renderWithProps = (props) => shallow(<Button {...props} />, {
        context: getStubContext(),
    });

    it('should render a FlatButton when no state is passed', () => {
        expect(renderWithProps({})).to.have.type(FlatButton);
    });

    it('should render a RaisedButton when raised is passed', () => {
        expect(renderWithProps({ raised: true })).to.have.type(RaisedButton);
    });

    it('should render a FloatingActionButton when fab is passed', () => {
        expect(renderWithProps({ fab: true })).to.have.type(FloatingActionButton);
    });
});
