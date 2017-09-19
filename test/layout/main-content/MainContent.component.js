import React from 'react';
import { shallow } from 'enzyme';
import MainContent from '../../../src/layout/main-content/MainContent.component';

describe('<MainContent />', () => {
    let component;

    beforeEach(() => {
        component = shallow(<MainContent />);
    });

    it('should add a default margin at the bottom', () => {
        expect(component.props().style.marginBottom).toBe('4rem');
    });

    it('should set the width of the main content to 100%', () => {
        expect(component.props().style.width).toBe('100%');
    });

    it('should render the passed children', () => {
        component = shallow(
            <MainContent>
                <h1>Some heading</h1>
                <div>Some content</div>
            </MainContent>
        );

        expect(component.props().children).toEqual([
            <h1>Some heading</h1>,
            <div>Some content</div>,
        ]);
    });
});
