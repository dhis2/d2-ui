import React from 'react';
import { mount, shallow } from 'enzyme';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { getStubContext } from '../../../config/inject-theme';
import Button from '../Button';


// https://www.sitepoint.com/test-react-components-jest/
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

    it('should pass on the onClick handler to MUI onTouchTap property', () => {
        const onClick = jest.fn();
        const component = mount(<Button onClick={onClick}></Button>, {
            context: getStubContext(),
        });
        const p = component.find('.d2-ui-button').first();
        p.simulate('click');
        expect(onClick).toBeCalledWith(1);


        /*
        const instance = component.instance();
        const spy = jest.spyOn('instance', 'onClick');

        instance.forceUpdate();

        component.find('.d2-ui-button').simulate('click');
        expect(spy).toHaveBeenCalled();
        */

        // jest.spyOn(formComponent.state.formValidator, 'runFor');

        // const clickSpy = sinon.spy();
        // expect(renderWithProps({ onClick: clickSpy }).props().onTouchTap).to.equal(clickSpy);
    });
});
