import React from 'react';
import { shallow } from 'enzyme';
import Item from '../SelectedItem';
// import DeselectIconButton from '../DeselectIconButton';

describe('Selected item component', () => {
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
            id: 'selected-item-test-id',
            name: 'I am a selected item',
            index: 0,
            highlighted: false,
            ghost: false,
            onClick: jest.fn(),
            onRemove: jest.fn(),
        };
        shallowItem = undefined;
    });

    it('renders an unhighlighted item', () => {
        const wrapper = item();

        expect(wrapper).toMatchSnapshot();
    });

    it('renders a highlighted item', () => {
        props.highlighted = true;
        const wrapper = item();

        expect(wrapper).toMatchSnapshot();
    });

    it('renders a ghost item', () => {
        props.ghost = true;
        const wrapper = item();

        expect(wrapper).toMatchSnapshot();
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
            expect(props.onClick).toBeCalledWith(true, false, 0, props.id);
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
            expect(props.onClick).toBeCalledWith(true, false, 0, props.id);
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
            expect(props.onClick).toBeCalledWith(false, true, 0, props.id);
        });
    });
});
