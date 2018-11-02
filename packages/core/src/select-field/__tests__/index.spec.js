import React from 'react';
import { shallow } from 'enzyme';
import MuiSelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import { getStubContext } from '../../../../../config/inject-theme';
import SelectField from '..';

const items = [{
    id: 'cat',
    name: 'Cat',
}, {
    id: 'mouse',
    name: 'Mouse',
}, {
    id: 'dog',
    name: 'Dog',
}];

describe('SelectField', () => {
    const renderWithProps = props => shallow(<SelectField {...props} />, {
        context: getStubContext(),
    });

    it('should render a MUI SelectField', () => {
        expect(renderWithProps().type()).toBe(MuiSelectField);
    });

    it('should add a class name', () => {
        expect(renderWithProps().props().className).toMatch('d2-ui-selectfield');
    });

    it('should add a custom class name when a selector is passed', () => {
        expect(renderWithProps({
            selector: 'my-selectfield',
        }).props().className).toMatch('d2-ui-selectfield-my-selectfield');
    });

    it('should set floatingLabelText when label is passed', () => {
        expect(renderWithProps({ label: 'My label' }).props().floatingLabelText).toEqual('My label');
    });

    it('should render items array as menu items', () => {
        const component = renderWithProps({ items });
        const node = <MenuItem value="mouse" primaryText="Mouse" />;
        expect(component.contains(node)).toBe(true);
    });

    it('should inset items when multiple select', () => {
        const component = renderWithProps({ items, multiple: true });
        const node = <MenuItem value="cat" primaryText="Cat" insetChildren />;
        expect(component.contains(node)).toBe(true);
    });

    it('should check selected items when multiple select', () => {
        const component = renderWithProps({ items, multiple: true, value: ['cat'] }); // multiple: true, value: ['cat']
        const node = <MenuItem value="cat" primaryText="Cat" insetChildren checked />;
        expect(component.contains(node)).toBe(true);
    });

    it('should render child nodes inside select field', () => {
        const noop = () => {};
        const node = <SelectField onChange={noop}><MenuItem value="cat" primaryText="Cat" /></SelectField>;
        const component = shallow(node, { context: getStubContext() });
        expect(component.contains(<MenuItem value="cat" primaryText="Cat" />)).toBe(true);
    });

    it('should call onChange function when field content is changed', () => {
        const onChangeSpy = jest.fn();
        renderWithProps({ items, onChange: onChangeSpy }).props().onChange({}, 1);
        expect(onChangeSpy).toHaveBeenCalledWith(items[1]);
    });

    it('should call onChange with item value when child nodes are used', () => {
        const onChangeSpy = jest.fn();
        const node = <SelectField onChange={onChangeSpy}><MenuItem value="cat" primaryText="Cat" /></SelectField>;
        shallow(node, { context: getStubContext() }).props().onChange({}, 0, 'cat');
        expect(onChangeSpy).toHaveBeenCalledWith('cat');
    });

    it('should show spinner when loading is set to true', () => {
        const component = renderWithProps({ loading: true });
        expect(component.contains(<CircularProgress size={30} />)).toBe(true);
    });

    it('should show text when loading is string', () => {
        const message = 'Loading...';
        const component = renderWithProps({ loading: message });
        expect(component.contains(<div>{message}</div>)).toBe(true);
    });

    it('should show error text', () => {
        expect(renderWithProps({ errorText: 'Error message' }).props().errorText).toEqual('Error message');
    });
});
