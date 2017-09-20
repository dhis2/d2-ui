import React from 'react';
import { shallow } from 'enzyme';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { getStubContext } from '../../../config/inject-theme';
import Button from '../Button';

describe('Button', () => {
    const renderWithProps = props => shallow(<Button {...props} />, {
        context: getStubContext(),
    });

    it('should render a FlatButton when no state is passed', () => {
        expect(renderWithProps({}).type()).toBe(FlatButton);
    });

    it('should render a RaisedButton when raised is passed', () => {
        expect(renderWithProps({ raised: true }).type()).toBe(RaisedButton);
    });

    it('should render a FloatingActionButton when fab is passed', () => {
        expect(renderWithProps({ fab: true }).type()).toBe(FloatingActionButton);
    });

    it('should render button text as a label property', () => {
        const component = shallow(<Button>Label</Button>, {
            context: getStubContext(),
        });

        expect(component.props().label).toEqual('Label');
    });

    it('should render child nodes inside button', () => {
        const component = shallow(<Button><div>Label</div></Button>, {
            context: getStubContext(),
        });

        expect(component.children().contains(<div>Label</div>)).toBe(true);
    });

    it('should call the onClick action when clicking the Button', () => {
        const clickSpy = jest.fn();

        const component = shallow(<Button onClick={clickSpy}>Label</Button>, {
            context: getStubContext(),
        });

        expect(component.props().onTouchTap).toEqual(clickSpy);
    });
});
