import React from 'react';
import { shallow } from 'enzyme';
import PublicAccessValue, { TranslateSpan } from '../data-value/PublicAccessValue.component';

describe('Public Access Value', () => {
    it('should render the r------- publicAccess pattern to its correct text value', () => {
        const renderedComponent = shallow(<PublicAccessValue value="r-------" />);

        expect(renderedComponent.find(TranslateSpan).prop('children')).toBe('public_can_view');
    });

    it('should render the r-r----- publicAccess pattern to its correct text value', () => {
        const renderedComponent = shallow(<PublicAccessValue value="r-r-----" />);

        expect(renderedComponent.find(TranslateSpan).prop('children')).toBe('public_can_view');
    });

    it('should render the r-rw---- publicAccess pattern to its correct text value', () => {
        const renderedComponent = shallow(<PublicAccessValue value="r-rw----" />);

        expect(renderedComponent.find(TranslateSpan).prop('children')).toBe('public_can_view');
    });

    it('should render the rw------ publicAccess pattern to its correct text value', () => {
        const renderedComponent = shallow(<PublicAccessValue value="rw------" />);

        expect(renderedComponent.find(TranslateSpan).prop('children')).toBe('public_can_edit');
    });

    it('should render the rwr----- publicAccess pattern to its correct text value', () => {
        const renderedComponent = shallow(<PublicAccessValue value="rwr-----" />);

        expect(renderedComponent.find(TranslateSpan).prop('children')).toBe('public_can_edit');
    });

    it('should render the rwrw---- publicAccess pattern to its correct text value', () => {
        const renderedComponent = shallow(<PublicAccessValue value="rwrw----" />);

        expect(renderedComponent.find(TranslateSpan).prop('children')).toBe('public_can_edit');
    });

    it('should render the -------- publicAccess pattern to its correct text value', () => {
        const renderedComponent = shallow(<PublicAccessValue value="--------" />);

        expect(renderedComponent.find(TranslateSpan).prop('children')).toBe('public_none');
    });

    it('should render the --r----- publicAccess pattern to its correct text value', () => {
        const renderedComponent = shallow(<PublicAccessValue value="--r-----" />);

        expect(renderedComponent.find(TranslateSpan).prop('children')).toBe('public_none');
    });

    it('should render the --rw---- publicAccess pattern to its correct text value', () => {
        const renderedComponent = shallow(<PublicAccessValue value="--rw----" />);

        expect(renderedComponent.find(TranslateSpan).prop('children')).toBe('public_none');
    });

    it('should not transform an unknown publicAccess pattern', () => {
        const renderedComponent = shallow(<PublicAccessValue value="rwx-----" />);

        expect(renderedComponent.find('TranslateSpan')).toHaveLength(0);
    });
});
