import React from 'react';
import { shallow } from 'enzyme';
import { default as MUICircularProgress } from 'material-ui/CircularProgress/CircularProgress';
import CircularProgress from '../CircularProgress';

describe('CircularProgress', () => {
    const renderProgress = (props) => shallow(<CircularProgress {...props} />);

    it('should render the material-ui CircularProgress component', () => {
        expect(renderProgress().type()).toBe(MUICircularProgress);
    });

    it('should render the material-ui component with the calculated values for size and style', () => {
        expect(renderProgress()).toHaveProp('size', 59.5);
        expect(renderProgress()).toHaveProp('style', { margin: 5.25 });
    });

    it('should render the mode as indeterminate by default', () => {
        expect(renderProgress()).toHaveProp('mode', 'indeterminate');
    });

    it('should render in twice the size when large is passed', () => {
        const largeCircularProgress = renderProgress({ large: true });

        expect(largeCircularProgress).toHaveProp('size', 119);
        expect(largeCircularProgress).toHaveProp('style', { margin: 10.5 });
    });

    it('should render in half the size when small is passed', () => {
        const largeCircularProgress = renderProgress({ small: true });

        expect(largeCircularProgress).toHaveProp('size', 29.75);
        expect(largeCircularProgress).toHaveProp('style', { margin: 2.625 });
    });

    it('should pass through the style prop and merge it with the default margin', () => {
        const largeCircularProgress = renderProgress({ style: { color: 'red' } });

        expect(largeCircularProgress).toHaveProp('style', { margin: 5.25, color: 'red' });
    });
});
