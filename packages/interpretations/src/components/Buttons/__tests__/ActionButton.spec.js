import React from 'react';
import { shallow } from 'enzyme';
import { ActionButton } from '../ActionButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Popper from '@material-ui/core/Popper';

let shallowActionButton;

const props = {
    classes: {},
    onClick: jest.fn(),
    iconType: 'unlike',
};

const actionButton = () => {
    if (!shallowActionButton) {
        shallowActionButton = shallow(<ActionButton {...props} />);
    }
    return shallowActionButton;
};

describe('components: Buttons -> ActionButton component ', () => {
    beforeEach(() => {
        shallowActionButton = undefined;
    });

    it('should render an Icon', () => {
        const icon = actionButton().find(ThumbUpIcon);
        expect(icon).toExist();
    });

    it('should call prop onClick when clicked', () => {
        actionButton().simulate('click');
        expect(props.onClick).toHaveBeenCalled();
    });

    describe('when state tooltipIsOpen is false', () => {
        it('should not show a tooltip', () => {
            const tooltip = actionButton().find(Popper);
            expect(tooltip.props().open).toEqual(false);
        });
    });

    describe('when state tooltipIsOpen is true', () => {
        beforeEach(() => {
            actionButton().setState({ tooltipIsOpen: true });
        });

        it('should show a tooltip', () => {
            const tooltip = actionButton().find(Popper);
            expect(tooltip.props().open).toEqual(true);
        });
    });
});