import React from 'react';
import { shallow } from 'enzyme';
import MuiPopover from 'material-ui/Popover';
import { getStubContext } from '../../../config/inject-theme';
import Button from '../../button/Button';
import Popover from '../Popover';

describe('Popover', () => {
    const renderWithProps = props => shallow(<Popover {...props} />, {
        context: getStubContext(),
    });

    it('should render without errors when no props are passed', () => {
        expect(renderWithProps({}).type()).toBe("div");
    })

    it('should render button passed as props to popover component', () => {
        expect(renderWithProps({button: <Button />}).find(Button).type()).toBe(Button)
    });

    it('should add onClick event to button passed to popover component', () => {
        expect(renderWithProps({button: <Button />}).find(Button).props().onClick).toBeDefined()
    });

    it('should add a class name', () => {
        expect(renderWithProps({className: 'd2-test'}).find(MuiPopover).props().className).toMatch('d2-test');
    });

    it('should render a header in the popover component', () => {
        expect(renderWithProps({footer: 'test'}).find(MuiPopover).find('footer')).toHaveLength(1);
    });

    it('should render a footer in the popover component', () => {
        expect(renderWithProps({header: 'test'}).find(MuiPopover).find('header')).toHaveLength(1);
    });

    it('should add style to popover component', () => {
        expect(renderWithProps({style: {'test': 'test'}}).find(MuiPopover).props().style.test).toBeDefined();
    });
});
