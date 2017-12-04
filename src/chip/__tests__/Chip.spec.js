import React from 'react';
import { shallow } from 'enzyme';
import MuiChip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import { getStubContext } from '../../../config/inject-theme';
import Chip, { disabledStyle, clickableStyle, colors, avatarProps, avatarIcons } from '../Chip';

describe('Chip', () => {
    const renderWithProps = (props) => shallow(<Chip {...props} />, {
        context: getStubContext(),
    });

    it('should render MUI Chip', () => {
        expect(renderWithProps({}).type()).toBe(MuiChip);
    });

    it('should add a class name', () => {
        expect(renderWithProps({}).props().className).toMatch('d2-ui-chip');
    });

    it('should render "pointer" cursor when onClick is a function', () => {
        expect(renderWithProps({ onClick: () => {}}).props().style.cursor).toMatch(clickableStyle.cursor);
    });

    it('should set default colors when color=undefined', () => {
        expect(renderWithProps({}).props().color).toMatch(colors['default'].color);
        expect(renderWithProps({}).props().backgroundColor).toMatch(colors['default'].backgroundColor);
    });

    it('should set primary colors when color=primary', () => {
        expect(renderWithProps({ color: 'primary' }).props().color).toMatch(colors.primary.color);
        expect(renderWithProps({ color: 'primary' }).props().backgroundColor).toMatch(colors.primary.backgroundColor);
    });

    it('should deactivate click handlers when disabled=true is passed', () => {
        expect(renderWithProps({ disabled: true }).props().onClick).toBe(undefined);
        expect(renderWithProps({ disabled: true }).props().onRequestDelete).toBe(undefined);
    });

    it('should render disabled style when disabled=true is passed', () => {
        expect(renderWithProps({ disabled: true }).props().style.cursor).toMatch(disabledStyle.cursor);
        expect(renderWithProps({ disabled: true }).props().style.opacity).toEqual(disabledStyle.opacity);
    });

    it('should render label as child node', () => {
        const component = shallow(<Chip label={'My label'} />, {
            context: getStubContext(),
        });

        expect(component.children().contains('My label')).toBe(true);
    });

    it('should render avatar according to avatar param', () => {
        const type = 'star';

        const avatar = <Avatar icon={avatarIcons[type]} {...avatarProps} />;

        const component = shallow(<Chip avatar={type} />, {
            context: getStubContext(),
        });

        expect(component.children().contains(avatar)).toBe(true);
    });

    it('should add a custom class name when a selector is passed', () => {
        expect(renderWithProps({ selector: 'mySelector' }).props().className).toMatch('d2-ui-chip-mySelector');
    });
});
