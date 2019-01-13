
import React from 'react';
import { shallow } from 'enzyme';
import { Replies } from '../Replies';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';

const baseProps = {
    classes: {},
};

let shallowReplies;

const replies = (partialProps = {}) => {
    if (!shallowReplies) {
        const props = {...baseProps, ...partialProps}
        shallowReplies = shallow(<Replies {...props} />);
    }
    return shallowReplies;
};

describe('components: Interpretation -> Likes component ', () => {
    beforeEach(() => {
        shallowReplies = undefined;
    });

    describe('with no replies', () => {
        it('should not render any children', () => {
            expect(replies({ repliedBy: [] }).children().length).toEqual(0);
        });
    });

    describe('with replies', () => {
        beforeEach(() => {
            replies({ repliedBy: ['Tom Waikiki', 'Kevin Boateng', 'Tom Waikiki']});
        });

        it('should show the amount of replies', () => {
            expect(replies().text()).toContain('3 replies')
        });
        
        describe('when state tooltipIsOpen is false', () => {
            it('should not show a tooltip', () => {
                const tooltip = replies().find(Popper);
                expect(tooltip).not.toExist();
            });
        });

        describe('when state tooltipIsOpen is true', () => {
            beforeEach(() => {
                replies().setState({ tooltipIsOpen: true });
            });
            
            it('should show a tooltip', () => {
                const tooltip = replies().find(Popper);
                expect(tooltip).toExist();
            });

            it('should filter duplicate names', () => {
                const tooltipNames = replies().find('ul').text();
                expect(tooltipNames).toEqual(' Tom Waikiki  Kevin Boateng ');
            });
        });
    });
});