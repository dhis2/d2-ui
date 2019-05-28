import React from 'react';
import { shallow } from 'enzyme';

import Checkbox from 'material-ui/Checkbox';
import MultiToggle from '../MultiToggle';

import { getStubContext } from '../../../../../config/inject-theme';

describe('MultiToggle component', () => {
    let Component;
    let onChangeSpy;
    const items = [
        {
            name: 'Monday',
            value: true,
            text: 'Monday is best',
        },
        {
            name: 'Friday',
            text: 'Friday is worst',
        },
    ];

    beforeEach(() => {
        onChangeSpy = jest.fn();

        const label = 'Days of week';

        Component = shallow(
            <MultiToggle items={items} label={label} onChange={onChangeSpy} />,
            { context: getStubContext() },
        );
    });

    it('should render a MultiToggle component', () => {
        expect(Component.find(Checkbox)).toHaveLength(items.length);
    });

    it('should call onChange function when the checkbox is clicked', () => {
        const muiCheckbox = Component.find(Checkbox).last();

        muiCheckbox.simulate('check', {});

        expect(onChangeSpy).toHaveBeenCalled();
    });

    it('should change the local state when field content is changed', () => {
        expect(Component.state().values).toEqual([items[0].name]);

        const muiCheckbox = Component.find(Checkbox).last();

        muiCheckbox.simulate('check', {}, true);

        const newState = items.map(item => item.name);
        expect(Component.state().values).toEqual(newState);
    });
});
