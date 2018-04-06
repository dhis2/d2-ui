import React from 'react';
import { shallow } from 'enzyme';
import { getStubContext } from '../../../config/inject-theme';
import ChartTabs from '../ChartTabs';

describe('ChartTabs', () => {
    let props;
    let shallowChartTabsComponent;
    const chartTabs = () => {
        if (!shallowChartTabsComponent) {
            shallowChartTabsComponent = shallow(<ChartTabs {...props} />, {
                context: getStubContext(),
            });
        }
        return shallowChartTabsComponent;
    };
    beforeEach(() => {
        props = {
            activeTab: 0,
            onChange: jest.fn(),
        };
        shallowChartTabsComponent = undefined;
    });
    // ChartTabs recieves 2 props, onChange (function [required]) and activeTab (number) [required]
    it('should alwyays receive 2 props: onChange (function) and activeTab (number)', () => {
        props = {
            activeTab: 3,
            onChange: jest.fn(),
        };
        console.log((props).props());
        expect(Object.keys(chartTabs(props).props()).length).toBe(2);
    });
    // when onChange is called, the prop activeTab is passed as value
    it('should update the prop activeTab when onChange is called', () => {

    });
});
