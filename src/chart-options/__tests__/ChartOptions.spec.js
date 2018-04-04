import React from 'react';
import { shallow } from 'enzyme';
import { getStubContext } from '../../../config/inject-theme';
import ChartOptions from '../ChartOptions';
import StyleOptions from '../StyleOptions';

describe('Data Visualizer, chart options component', () => {
    let stylesOptionsComponent;
    let onTabClickSpy;

    function renderComponent(props = {}) {
        return shallow(<ChartOptions {...props} />, {
            context: getStubContext(),
        });
    }

    beforeEach(() => {
        onTabClickSpy = jest.fn();

        stylesOptionsComponent = renderComponent({ activeTab: 3 });
    });


    it('should add a class name', () => {
        expect(renderComponent({}).props().className).toMatch('d2-ui-chartoptions');
    });

    it('should add a custom class name when selector is passed', () => {
        expect(renderComponent({ selector: 'my-chartoptions' }).props().className).toMatch('d2-ui-chartoptions-my-chartoptions');
    });

    it('should call onChange function when a field content is changed', () => {
        const onChangeSpy = jest.fn();

        renderComponent({ onChange: onChangeSpy }).props().onChange({}, 'my onChange test');
        expect(onChangeSpy).toHaveBeenCalledWith('my onChange test');
    });

    it('should render a StylesOptions component', () => {
        expect(stylesOptionsComponent.find(StyleOptions)).toHaveLength(1);
    });

    it('should render the MUITextField with the correct properties', () => {
        const props = {
            tabContent: {
                showValues: true,
                hideLegend: true,
                category: 'my chartoptions category test',
                trendLine: 'my trendLine prop test',
                decimals: 1111,
                hideSubtitle: true,


            },
            activeTab: 3,
        };

        const chartOptions = renderComponent(props).find(ChartOptions);

        expect(chartOptions.props().showValues).toEqual(props.showValues);
        expect(chartOptions.props().hideLegend).toEqual(props.hideLegend);
        expect(chartOptions.props().category).toEqual(props.category);
        expect(chartOptions.props().trendLine).toEqual(props.trendLine);
        expect(chartOptions.props().decimals).toEqual(props.decimals);
        expect(chartOptions.props().hideSubtitle).toEqual(props.hideSubtitle);
        expect(chartOptions.props().activeTab).toEqual(props.activeTab);
    });
});
