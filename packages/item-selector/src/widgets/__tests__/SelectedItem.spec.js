import React from 'react';
import { shallow } from 'enzyme';
import Item from '../SelectedItem';
import DeselectIconButton from '../DeselectIconButton';
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
            name: 'The selected item',
            index: 0,
            highlighted: false,
            ghost: false,
            onClick: jest.fn(),
            onRemove: jest.fn(),
        };
        shallowItem = undefined;
    });

    it('Should match the snapshot', () => {
        const wrapper = item();

        expect(wrapper).toMatchSnapshot();
    });

    // it('renders a div containing everything else', () => {
    //     const wrappingDiv = item()
    //         .find('div')
    //         .first();

    //     expect(
    //         item()
    //             .find('div')
    //             .first()
    //     ).toHaveLength(1);
    //     expect(wrappingDiv.children()).toEqual(item().children());
    // });

    // it('renders <UnselectedIcon /> when prop "selected" is true ', () => {
    //     const icon = item()
    //         .find('Icon')
    //         .dive()
    //         .find(ItemIcon);

    //     expect(icon.prop('backgroundColor')).toEqual(colors.grey);
    // });

    // it('renders a <HighlightedIcon /> when props highlighted and selected are true', () => {
    //     props.highlighted = true;
    //     props.selected = true;

    //     const icon = item()
    //         .find('Icon')
    //         .dive()
    //         .find(ItemIcon);

    //     expect(icon.prop('backgroundColor')).toEqual(colors.white);
    // });

    // it('renders <SelectedIcon /> when className is equal to "selected" ', () => {
    //     props.selected = true;

    //     const icon = item()
    //         .find('Icon')
    //         .dive()
    //         .find(ItemIcon);

    //     expect(icon.prop('backgroundColor')).toEqual(colors.accentSecondary);
    // });

    // it('renders <DeselectIconButton /> for selected item ', () => {
    //     props.selected = true;

    //     const removeButton = item().find(DeselectIconButton);

    //     expect(removeButton.length).toEqual(1);
    // });

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
