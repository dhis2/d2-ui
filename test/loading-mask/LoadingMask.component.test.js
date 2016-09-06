import React from 'react';
import LoadingMask from '../../src/loading-mask/LoadingMask.component';

import {shallow} from 'enzyme';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';

describe('LoadingMask', () => {
    let loadingMask;

    beforeEach(() => {
        loadingMask = shallow(<LoadingMask />);
    });

    it('should render a CircularProgress component', () => {
        expect(loadingMask.find(CircularProgress)).to.have.length(1);
    });

    it('should render a indeterminate mode loader', () => {
        expect(loadingMask.props().mode).to.equal('indeterminate');
    });

    it('should pass the default size of 1.5 if no size was provided', () => {
        expect(loadingMask.props().size).to.equal(1.5);
    });

    it('should pass the default style options if no style was provided', () => {
        const expectedStyle = {
            left: '45%',
            position: 'fixed',
            top: '45%',
        };

        expect(loadingMask.props().style).to.deep.equal(expectedStyle);
    });

    it('should pass a different size if one was provided', () => {
        loadingMask.setProps({size: 3});

        expect(loadingMask.props().size).to.equal(3);
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
});
