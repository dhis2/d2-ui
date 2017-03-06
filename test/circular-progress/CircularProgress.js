import React from 'react';
import { shallow } from 'enzyme';
import { default as MUICircularProgress } from 'material-ui/CircularProgress/CircularProgress';
import CircularProgress from '../../src/circular-progress/CircularProgress';

describe('CircularProgress', () => {
    const renderProgress = (props) => shallow(<CircularProgress {...props} />);

    it('should render the material-ui CircularProgress component', () => {
        expect(renderProgress()).to.have.type(MUICircularProgress);
    });

    it('should render the material-ui component with the calculated values for size and style', () => {
        expect(renderProgress()).to.have.prop('size', 59.5);
        expect(renderProgress()).to.have.prop('style').deep.equal({ margin: 5.25 });
    });

    it('should render the mode as indeterminate by default', () => {
        expect(renderProgress()).to.have.prop('mode', 'indeterminate');
    });

    it('should render in twice the size when large is passed', () => {
        const largeCircularProgress = renderProgress({ large: true });

        expect(largeCircularProgress).to.have.prop('size', 119);
        expect(largeCircularProgress).to.have.prop('style').deep.equal({ margin: 10.5 });
    });

    it('should render in half the size when small is passed', () => {
        const largeCircularProgress = renderProgress({ small: true });

        expect(largeCircularProgress).to.have.prop('size', 29.75);
        expect(largeCircularProgress).to.have.prop('style').deep.equal({ margin: 2.625 });
    });

    it('should pass through the style prop and merge it with the default margin', () => {
        const largeCircularProgress = renderProgress({ style: { color: 'red' } });

        expect(largeCircularProgress).to.have.prop('style').deep.equal({ margin: 5.25, color: 'red' });
    });
});
