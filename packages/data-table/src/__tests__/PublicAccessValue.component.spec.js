import React from 'react';
import { shallow } from 'enzyme';
import Color from '../data-value/Color.component';
import { findValueRenderer, addValueRenderer } from '../data-value/valueRenderers';

describe.skip('Public Access Value', () => {
    it('should find the correct renderer', () => {
        const PublicAccessRenderer = findValueRenderer({ value: 'r-------', columnName: 'publicAccess' });
        const renderedComponent = shallow(<PublicAccessRenderer value="r-------" />);

        expect(renderedComponent.find(Translate)).toHaveLength(1);
    });

    it('should render the r------- publicAccess pattern to its correct text value', () => {
        const PublicAccessRenderer = findValueRenderer({ value: 'r-------', columnName: 'publicAccess' });
        const renderedComponent = shallow(<PublicAccessRenderer value="r-------" />);

        expect(renderedComponent.find(Translate).prop('children')).toBe('public_can_view');
    });

    it('should render the r-r----- publicAccess pattern to its correct text value', () => {
        const PublicAccessRenderer = findValueRenderer({ value: 'r-r-----', columnName: 'publicAccess' });
        const renderedComponent = shallow(<PublicAccessRenderer value="r-r-----" />);

        expect(renderedComponent.find(Translate).prop('children')).toBe('public_can_view');
    });

    it('should render the r-rw---- publicAccess pattern to its correct text value', () => {
        const PublicAccessRenderer = findValueRenderer({ value: 'r-rw----', columnName: 'publicAccess' });
        const renderedComponent = shallow(<PublicAccessRenderer value="r-rw----" />);

        expect(renderedComponent.find(Translate).prop('children')).toBe('public_can_view');
    });

    it('should render the rw------ publicAccess pattern to its correct text value', () => {
        const PublicAccessRenderer = findValueRenderer({ value: 'rw------', columnName: 'publicAccess' });
        const renderedComponent = shallow(<PublicAccessRenderer value="rw------" />);

        expect(renderedComponent.find(Translate).prop('children')).toBe('public_can_edit');
    });

    it('should render the rwr----- publicAccess pattern to its correct text value', () => {
        const PublicAccessRenderer = findValueRenderer({ value: 'rwr-----', columnName: 'publicAccess' });
        const renderedComponent = shallow(<PublicAccessRenderer value="rwr-----" />);

        expect(renderedComponent.find(Translate).prop('children')).toBe('public_can_edit');
    });

    it('should render the rwrw---- publicAccess pattern to its correct text value', () => {
        const PublicAccessRenderer = findValueRenderer({ value: 'rwrw----', columnName: 'publicAccess' });
        const renderedComponent = shallow(<PublicAccessRenderer value="rwrw----" />);

        expect(renderedComponent.find(Translate).prop('children')).toBe('public_can_edit');
    });

    it('should render the -------- publicAccess pattern to its correct text value', () => {
        const PublicAccessRenderer = findValueRenderer({ value: '--------', columnName: 'publicAccess' });
        const renderedComponent = shallow(<PublicAccessRenderer value="--------" />);

        expect(renderedComponent.find(Translate).prop('children')).toBe('public_none');
    });

    it('should render the --r----- publicAccess pattern to its correct text value', () => {
        const PublicAccessRenderer = findValueRenderer({ value: '--r-----', columnName: 'publicAccess' });
        const renderedComponent = shallow(<PublicAccessRenderer value="--r-----" />);

        expect(renderedComponent.find(Translate).prop('children')).toBe('public_none');
    });

    it('should render the --rw---- publicAccess pattern to its correct text value', () => {
        const PublicAccessRenderer = findValueRenderer({ value: '--rw----', columnName: 'publicAccess' });
        const renderedComponent = shallow(<PublicAccessRenderer value="--rw----" />);

        expect(renderedComponent.find(Translate).prop('children')).toBe('public_none');
    });

    it('should not transform an unknown publicAccess pattern', () => {
        const PublicAccessRenderer = findValueRenderer({ value: 'rwx-----', columnName: 'publicAccess' });
        const renderedComponent = shallow(<PublicAccessRenderer value="rwx-----" />);

        expect(renderedComponent.find('TextValue').prop('value')).toBe('rwx-----');
    });

    it('should not transform an empty value', () => {
        const PublicAccessRenderer = findValueRenderer({ value: '', columnName: 'publicAccess' });
        const renderedComponent = shallow(<PublicAccessRenderer value="" />);

        expect(renderedComponent.find('TextValue').prop('value')).toBe('');
    });
});
