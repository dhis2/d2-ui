import React from 'react';
import { shallow } from 'enzyme';
import { Likes } from '../Likes';
import Popper from '@material-ui/core/Popper';

const baseProps = {
    classes: {},
};

let shallowLikes;

const likes = (partialProps = {}) => {
    if (!shallowLikes) {
        const props = {...baseProps, ...partialProps}
        shallowLikes = shallow(<Likes {...props} />);
    }
    return shallowLikes;
};

describe('components: Interpretation -> Likes component ', () => {
    beforeEach(() => {
        shallowLikes = undefined;
    });

    describe('with no likes', () => {
        it('should not render any children', () => {
            expect(likes({ likedBy: [] }).children().length).toEqual(0);
        });
    });

    describe('with likes', () => {
        beforeEach(() => {
            likes({ likedBy: ['Tom Waikiki', 'Kevin Boateng']});
        });

        it('should show the amount of likes', () => {
            expect(likes().text()).toContain('2 likes')
        })
        
        describe('when state tooltipIsOpen is false', () => {
            it('should not show a tooltip', () => {
                const tooltip = likes().find(Popper);
                expect(tooltip).not.toExist();
            });
        });

        describe('when state tooltipIsOpen is true', () => {
            beforeEach(() => {
                likes().setState({ tooltipIsOpen: true });
            });
            
            it('should show a tooltip', () => {
                const tooltip = likes().find(Popper);
                expect(tooltip).toExist();
            });
        });
    });
});
