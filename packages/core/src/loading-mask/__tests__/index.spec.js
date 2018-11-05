import React from 'react';
import { shallow } from 'enzyme';
import LoadingMask from '../LoadingMask.component';
import CircularProgress from '../../circular-progress';

describe('LoadingMask', () => {
    const renderLoadingMask = (props = {}) => shallow(<LoadingMask {...props} />);
    let loadingMask;

    beforeEach(() => {
        loadingMask = renderLoadingMask();
    });

    it('should render a CircularProgress component', () => {
        expect(loadingMask.find(CircularProgress)).toHaveLength(1);
    });

    it('should pass the default style options if no style was provided', () => {
        const expectedStyle = {
            left: '45%',
            position: 'fixed',
            top: '45%',
        };

        expect(loadingMask).toHaveProp('style', expectedStyle);
    });

    it('should combine passed style prop with the predefined style', () => {
        const expectedStyle = {
            left: '55%',
            position: 'relative',
            top: '45%',
        };

        loadingMask.setProps({ style: { left: '55%', position: 'relative' } });

        expect(loadingMask.props().style).toEqual(expectedStyle);
    });

    it('should render the CircularProgress as large when large is passed as prop', () => {
        const loadingMask = renderLoadingMask({ large: true });

        expect(loadingMask.find(CircularProgress)).toHaveProp('large', true);
    });

    it('should render the CircularProgress as small when small is passed as prop', () => {
        const loadingMask = renderLoadingMask({ small: true });

        expect(loadingMask.find(CircularProgress)).toHaveProp('small', true);
    });
});
