import React from 'react';
import { mount } from 'enzyme';
import { Description } from '../Description';

let shallowDescription;

let baseProps = {
    isToggled: false,
    onToggleDescription: jest.fn(),
};

const description = (partialProps = {}) => {
    if (!shallowDescription) {
        const props = {...baseProps, ...partialProps};
        shallowDescription = mount(<Description {...props} />);
    }
    return shallowDescription;
};

describe('components: DetailsPanel -> Description component ', () => {
   beforeEach(() => {
        shallowDescription = undefined;
   });

   describe('with no description passed from prop', () => {
        it('should return "No description"', () => {
            expect(description().text()).toEqual('No description');
        });
   });

   describe('with description passed from prop', () => {
        it('should show a description with rich text', () => {
            expect(
                description({ displayDescription: 'Some *rich text* _description_' }).text())
                .toEqual('Some rich text description');
        });
    });

});
