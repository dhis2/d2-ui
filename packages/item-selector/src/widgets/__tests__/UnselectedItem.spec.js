import React from 'react';
import { shallow } from 'enzyme';
import Item from '../UnselectedItem';
import ItemIcon from '../ItemIcon';
import { colors } from '../../styles/colors';

describe('The Item component ', () => {
    let props;
    let shallowItem;

    const item = () => {
        if (!shallowItem) {
            shallowItem = shallow(<Item {...props} />);
        }
        return shallowItem;
    };

    beforeEach(() => {
        props = {
            id: 'testID',
            name: 'displayTestName',
            index: 0,
            highlighted: false,
            onClick: jest.fn(),
        };
        shallowItem = undefined;
    });

    it('renders a div containing everything else', () => {
        const wrappingDiv = item()
            .find('div')
            .first();

        expect(
            item()
                .find('div')
                .first()
        ).toHaveLength(1);
        expect(wrappingDiv.children()).toEqual(item().children());
    });

    it('renders <UnselectedIcon /> when prop "selected" is true ', () => {
        const icon = item()
            .find('Icon')
            .dive()
            .find(ItemIcon);

        expect(icon.prop('backgroundColor')).toEqual(colors.grey);
    });

    it('renders a <HighlightedIcon /> when props highlighted and selected are true', () => {
        props.highlighted = true;
        props.selected = true;

        const icon = item()
            .find('Icon')
            .dive()
            .find(ItemIcon);

        expect(icon.prop('backgroundColor')).toEqual(colors.white);
    });

    describe('onClick', () => {
        it('fires onClick property', () => {
            item()
                .props()
                .onClick({ preventDefault: () => undefined });

            expect(props.onClick).toBeCalledTimes(1);
        });

        it('fires onClick with correct arguments when metaKey pressed', () => {
            item()
                .props()
                .onClick({
                    preventDefault: () => undefined,
                    metaKey: true,
                    ctrlKey: false,
                    shiftKey: false,
                });

            expect(props.onClick).toBeCalledTimes(1);
            expect(props.onClick).toBeCalledWith(true, false, 0, 'testID');
        });

        it('fires onClick with correct arguments when ctrlKey pressed', () => {
            item()
                .props()
                .onClick({
                    preventDefault: () => undefined,
                    metaKey: false,
                    ctrlKey: true,
                    shiftKey: false,
                });

            expect(props.onClick).toBeCalledTimes(1);
            expect(props.onClick).toBeCalledWith(true, false, 0, 'testID');
        });

        it('fires onClick with correct arguments when shiftKey pressed', () => {
            item()
                .props()
                .onClick({
                    preventDefault: () => undefined,
                    metaKey: false,
                    ctrlKey: false,
                    shiftKey: true,
                });

            expect(props.onClick).toBeCalledTimes(1);
            expect(props.onClick).toBeCalledWith(false, true, 0, 'testID');
        });
    });
});
