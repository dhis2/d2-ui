import React from 'react';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import PeriodListItem, { RemoveItemButton } from '../PeriodListItem';

describe('PeriodListItem', () => {
    let props;
    let shallowItem;
    const getShallowItem = () => {
        if (!shallowItem) {
            shallowItem = shallow(<PeriodListItem {...props} />);
        }
        return shallowItem;
    };

    beforeEach(() => {
        props = {
            period: { id: 'hey', name: 'Hey', selected: true },
            index: 0,
            onPeriodClick: jest.fn(),
            onPeriodDoubleClick: jest.fn(),
            onRemovePeriodClick: jest.fn(),
            listClassName: 'selected',
        };
        shallowItem = undefined;
    });

    it('renders a list item', () => {
        expect(getShallowItem().find('li')).toHaveLength(1);
    });

    it('displays the name of the period', () => {
        const itemText = getShallowItem().find('div').childAt(1).text();
        expect(itemText).toEqual(props.period.name);
    });

    it('triggers onClick', () => {
        const item = getShallowItem().find('div');
        item.simulate('click', { shiftKey: 'a', metaKey: 'b' });
        expect(props.onPeriodClick).toHaveBeenCalled();
        expect(props.onPeriodClick).toHaveBeenCalledWith(props.period, props.index, 'a', 'b');
    });

    it('triggers onDoubleCLick', () => {
        const item = getShallowItem().find('div');
        item.simulate('doubleclick');
        expect(props.onPeriodDoubleClick).toHaveBeenCalled();
        expect(props.onPeriodDoubleClick).toHaveBeenCalledWith(props.period);
    });

    describe('unselected item', () => {
        beforeEach(() => {
            props.listClassName = 'periods-list-offered';
            props.period.selected = false;
        });

        it('does not render the remove button', () => {
            expect(getShallowItem().find(RemoveItemButton)).toHaveLength(0);
        });
    });

    describe('selected item', () => {
        beforeEach(() => {
            props.listClassName = 'selected';
            props.period.selected = true;
        });

        it('renders the remove button', () => {
            expect(getShallowItem().find(RemoveItemButton)).toHaveLength(1);
        });

        it('triggers the onRemoveItem action', () => {
            const item = getShallowItem().find(RemoveItemButton).dive().find(IconButton);
            item.simulate('click', { stopPropagation: jest.fn() });
            expect(props.onRemovePeriodClick).toHaveBeenCalled();
            expect(props.onRemovePeriodClick).toHaveBeenCalledWith(props.period);
        });
    });
});
