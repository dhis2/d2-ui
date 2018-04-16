import React from 'react';
import { shallow } from 'enzyme';
import { Column } from 'd2-ui-core';

import Legend from '../Legend.component';
import { getStubContext } from '../../../../config/inject-theme';

describe('Legend component', () => {
    let props;
    let shallowLegend;
    const legendComponent = () => {
        if (!shallowLegend) {
            shallowLegend = shallow(
                <Legend {...props} />, {
                    context: getStubContext(),
                },
            );
        }
        return shallowLegend;
    }

    beforeEach(() => {
        props = {
            items: [],
            onItemsChange: () => {},
        };
        shallowLegend = undefined;
    });

    it('renders a Column component', () => {
        const column = legendComponent().find(Column);
        expect(column.length).toBeGreaterThan(0);
    });

    it('renders a Row component as a child of Column', () => {
        const children = legendComponent().find(Column).first().children();
        expect(children.find('Row').length).toBeGreaterThan(0);
    });

    it('renders a LegendItems component as a child of Column', () => {
        const children = legendComponent().find(Column).first().children();
        expect(children.find('LegendItems').length).toBeGreaterThan(0);
    });

    it('renders a Dialog component as a child of Column', () => {
        const children = legendComponent().find(Column).first().children();
        expect(children.find('Dialog').length).toBeGreaterThan(0);
    });

    describe('when items provided', () => {
        beforeEach(() => {
            props.items = [
                'legendItem1',
                'legendItem2',
            ];
        });

        it('passes the items array to the LegendItems component', () => {
            const legendItemComponent = legendComponent().find('LegendItems');
            expect(legendItemComponent.prop('items').length).toEqual(2);
        });
    });
});
