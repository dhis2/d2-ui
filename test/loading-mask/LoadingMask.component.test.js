import React from 'react';
import {shallow} from 'enzyme';
import LoadingMask from '../../src/loading-mask/LoadingMask.component';
import CircularProgress from '../../src/circular-progress/CircularProgress';

describe('LoadingMask', () => {
    const renderLoadingMask = (props = {}) => shallow(<LoadingMask {...props} />);
    let loadingMask;

    beforeEach(() => {
        loadingMask = renderLoadingMask();
    });

    it('should render a CircularProgress component', () => {
        expect(loadingMask.find(CircularProgress)).to.have.length(1);
    });

    it('should pass the default style options if no style was provided', () => {
        const expectedStyle = {
            left: '45%',
            position: 'fixed',
            top: '45%',
        };

        expect(loadingMask).to.have.prop('style').deep.equal(expectedStyle);
    });

    it('should combine passed style prop with the predefined style', () => {
        const expectedStyle = {
            left: '55%',
            position: 'relative',
            top: '45%',
        };

        loadingMask.setProps({style: {left: '55%', position: 'relative'}});

        expect(loadingMask.props().style).to.deep.equal(expectedStyle);
    });

    it('should render the CircularProgress as large when large is passed as prop', () => {
        const loadingMask = renderLoadingMask({ large: true });

        expect(loadingMask.find(CircularProgress)).to.have.prop('large', true);
    });

    it('should render the CircularProgress as small when small is passed as prop', () => {
        const loadingMask = renderLoadingMask({ small: true });

        expect(loadingMask.find(CircularProgress)).to.have.prop('small', true);
    });
});
