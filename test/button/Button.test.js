import React from 'react';
import { shallow } from 'enzyme';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { getStubContext } from '../../config/inject-theme';
import Button from '../../src/button/Button';

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

    it('should render button text as a label property', () => {
        const component = shallow(<Button>Label</Button>, {
            context: getStubContext(),
        });

        expect(component.props().label).to.equal('Label');
    });

    it('should render child nodes inside button', () => {
        const component = shallow(<Button><div>Label</div></Button>, {
            context: getStubContext(),
        });

        expect(component.children().contains(<div>Label</div>)).to.true;
    });
});
