import React from 'react';
import { shallow } from 'enzyme';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { getStubContext } from '../../../../../config/inject-theme';
import Button from '../Button';

describe('Button', () => {
    const renderWithProps = props => {
        const nops = {
            onClick: () => {},
            ...props,
        };
        return shallow(<Button {...nops}>label</Button>, {
            context: getStubContext(),
        });
    };

    it('should render a FlatButton when no state is passed', () => {
        expect(renderWithProps({}).type()).toBe(FlatButton);
    });

    it('should render a RaisedButton when raised is passed', () => {
        expect(renderWithProps({ raised: true }).type()).toBe(RaisedButton);
    });

    it('should render a FloatingActionButton when fab is passed', () => {
        expect(renderWithProps({ fab: true }).type()).toBe(FloatingActionButton);
    });

    it('should set primary property to true when color=primary is passed', () => {
        expect(renderWithProps({ color: 'primary' }).props().primary).toBeTruthy();
    });

    it('should set secondary property to true when color=accent is passed', () => {
        expect(renderWithProps({ color: 'accent' }).props().secondary).toBeTruthy();
    });

    it('should add a class name', () => {
        expect(renderWithProps({}).props().className).toMatch('d2-ui-button');
    });

    it('should add a custom class name when a selector is passed', () => {
        expect(renderWithProps({ selector: 'my-button' }).props().className).toMatch('d2-ui-button-my-button');
    });

    it('should render button text as a label property', () => {
        const noop = () => {};
        const component = shallow(<Button onClick={noop}>Label</Button>, {
            context: getStubContext(),
        });

        expect(component.props().label).toEqual('Label');
    });

    it('should render child nodes inside button', () => {
        const noop = () => {};
        const component = shallow(<Button onClick={noop}><div>Label</div></Button>, {
            context: getStubContext(),
        });

        expect(component.children().contains(<div>Label</div>)).toBe(true);
    });

    it('should pass on the onClick handler to MUI onClick property', () => {
        const onClick = jest.fn();

        expect(renderWithProps({ onClick: onClick }).props().onClick).toEqual(onClick);
    });
});
