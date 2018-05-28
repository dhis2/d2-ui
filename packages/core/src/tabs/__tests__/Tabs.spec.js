import React from 'react';
import { shallow } from 'enzyme';
import { Tabs as MuiTabs, Tab as MuiTab } from 'material-ui/Tabs';
import { getStubContext } from '../../../../../config/inject-theme';
import Tabs, { Tab } from '../Tabs';

describe('Tabs', () => {
    const renderWithProps = (props) => shallow(<Tabs {...props} />, {
        context: getStubContext(),
    });

    it('should render MUI Tabs', () => {
        expect(renderWithProps({}).type()).toBe(MuiTabs);
    });

    it('should add a class name', () => {
        expect(renderWithProps({}).props().className).toMatch('d2-ui-tabs');
    });

    it('should add a custom class name when a selector is passed', () => {
        expect(renderWithProps({ selector: 'my-tabs' }).props().className).toMatch('d2-ui-tabs-my-tabs');
    });
});

describe('Tab', () => {
    const renderWithProps = (props) => shallow(<Tab {...props} />, {
        context: getStubContext(),
    });

    it('should render a MUI Tab', () => {
        expect(renderWithProps({}).type()).toBe(MuiTab);
    });

    it('should add a class name', () => {
        expect(renderWithProps({}).props().className).toMatch('d2-ui-tab');
    });

    it('should add a custom class name when a selector is passed', () => {
        expect(renderWithProps({ selector: 'my-tab' }).props().className).toMatch('d2-ui-tab-my-tab');
    });
});
