import React from 'react';
import { shallow, mount } from 'enzyme';
import PropTypes from 'prop-types';

import { getStubContext } from '../../../config/inject-theme';
import Button from '../../button/Button';

import ControlBar from '../ControlBar';

ControlBar.contextTypes = {
    muiTheme: PropTypes.any,
    d2: PropTypes.any,
};

describe('ControlBar', () => {
    const renderControlBar = (props, children = <div />) => shallow(<ControlBar {...props}>{children}</ControlBar>, {
        context: getStubContext(),
    });
    const noop = () => {};
    const requestAnimationFrame = callback => callback();

    it('should render a div', () => {
        expect(renderControlBar({}).type()).toBe('div');
    });

    it('should have the correct class name', () => {
        expect(renderControlBar({}).is('.d2-ui-control-bar')).toBe(true);
    });

    it('should have the correct class name selector', () => {
        expect(renderControlBar({ selector: 'xxx' }).is('.d2-ui-control-bar-xxx')).toBe(true);
    });

    it('should have the base class name even when a selector is specified', () => {
        expect(renderControlBar({ selector: 'xxx' }).is('.d2-ui-control-bar')).toBe(true);
    });

    it('should contain the specified children', () => {
        const children = <div><p>Child</p><p>elements</p></div>;
        expect(shallow(<ControlBar>{children}</ControlBar>).contains(children)).toBe(true);
    });

    it('should render the end flap', () => {
        expect(renderControlBar({}, <div className="c" />).find('.c + div').length).toBe(1);
    });

    it('should set the height of the end flap to 0 by default', () => {
        expect(renderControlBar({}, <div className="c" />).find('.c + div').props().style.height).toBe(0);
    });

    it('should set the height of the end flap to 10 when an onChangeHeight callback is specified', () => {
        const controlBar = renderControlBar({ onChangeHeight: noop }, <div className="c" />);
        expect(controlBar.find('.c + div').props().style.height).toBe(10);
    });

    it('should change the background color in edit mode', () => {
        expect(renderControlBar({ editMode: true }).props().style.background).not.toBe('white');
    });

    it('should change height when an onChangeHeight callback is specified', () => {
        const plainBar = renderControlBar();
        const draggableBar = renderControlBar({ onChangeHeight: noop });
        expect(draggableBar.props().style.height).not.toBe(plainBar.props().style.height);
    });

    it('should change height when an onExpandClick callback is specified', () => {
        const expandableBar = renderControlBar({ onExpandClick: noop });
        expect(expandableBar.props().style.height).toBe(68);
    });

    it('should change height when both an onExpandClick callback and an onChangeHeight callback is specified', () => {
        const expansivelyDraggableBar = renderControlBar({ onExpandClick: noop, onChangeHeight: noop });
        expect(expansivelyDraggableBar.props().style.height).toBe(78);
    });

    it('should render an expand button when an onExpandClick callback is specified', () => {
        const controlBar = renderControlBar({ onExpandClick: noop }, <div className="c" />);
        expect(controlBar.find('.c + div').find(Button).length).toBe(1);
    });

    it('should render the correct label text on the expand button', () => {
        const controlBar = renderControlBar({ onExpandClick: noop });
        expect(controlBar.find(Button).length).toBe(1);
        expect(controlBar.find(Button).contains('Expand')).toBe(true);
    });

    it('should not render an expand button when no onExpandClick callback is specified', () => {
        const controlBar = renderControlBar({});
        expect(controlBar.find(Button).length).toBe(0);
    });

    it('should call the onExpandClick callback when the expand button is clicked', () => {
        const onExpandClick = jest.fn();
        const controlBar = renderControlBar({ onExpandClick });

        expect(onExpandClick.mock.calls.length).toBe(0);
        controlBar.find(Button).simulate('click');
        expect(onExpandClick.mock.calls.length).toBe(1);
    });

    it('should call the onChangeHeight callback when the "flap" is dragged', () => {
        // Replace the async DOM function with a sync function that immediately executes the callback
        window.requestAnimationFrame = requestAnimationFrame;

        const onChangeHeightFn = jest.fn();
        const controlBar = mount(<ControlBar onChangeHeight={onChangeHeightFn}><div className="c" /></ControlBar>, {
            context: getStubContext(),
        });
        const dragFlap = controlBar.find('.c + div > div');

        dragFlap.simulate('mousedown');
        window.dispatchEvent(new MouseEvent('mousemove', { clientY: 1234 }));
        window.dispatchEvent(new Event('mouseup'));

        expect(onChangeHeightFn.mock.calls.length).toBe(1);
    });

    it('should account for the height of the expand button when calling the onChangeHeight callback', () => {
        // Replace the async DOM function with a sync function that immediately executes the callback
        window.requestAnimationFrame = requestAnimationFrame;

        const onChangeHeightFn = jest.fn();
        const controlBar = mount(<ControlBar onChangeHeight={onChangeHeightFn}><div className="c" /></ControlBar>, {
            context: getStubContext(),
        });
        const dragFlap = controlBar.find('.c + div > div');

        dragFlap.simulate('mousedown');
        window.dispatchEvent(new MouseEvent('mousemove', { clientY: 1234 }));
        window.dispatchEvent(new Event('mouseup'));

        const controlBarWithExandButton = mount((
            <ControlBar onChangeHeight={onChangeHeightFn} onExpandClick={noop}><div className="c" /></ControlBar>
        ), {
            context: getStubContext(),
        });
        const anotherDragFlap = controlBarWithExandButton.find('.c + div > div').last();

        anotherDragFlap.simulate('mousedown');
        window.dispatchEvent(new MouseEvent('mousemove', { clientY: 1234 }));
        window.dispatchEvent(new Event('mouseup'));

        // Expect the height from the 2nd call (with Expand button) to be less than the 1st call (no Expand button)
        expect(onChangeHeightFn.mock.calls[1][0]).toBeLessThan(onChangeHeightFn.mock.calls[0][0]);
    });

    it('should only call the onChangeHeight callback if the height actually changed', () => {
        // Replace the async DOM function with a sync function that immediately executes the callback
        window.requestAnimationFrame = requestAnimationFrame;

        const onChangeHeightFn = jest.fn();
        // Do not double check this math...
        const initialHeight = 1234;
        const randomMousePosition = 4321;

        const controlBar = mount((
            <ControlBar height={initialHeight} onChangeHeight={onChangeHeightFn}><div className="c" /></ControlBar>
        ), { context: getStubContext() });
        const dragFlap = controlBar.find('.c + div > div');

        dragFlap.simulate('mousedown');
        window.dispatchEvent(new MouseEvent('mousemove', { clientY: randomMousePosition }));
        expect(onChangeHeightFn.mock.calls.length).toBe(1);
        const newHeight = initialHeight - onChangeHeightFn.mock.calls[0][0];

        window.dispatchEvent(new MouseEvent('mousemove', { clientY: newHeight + randomMousePosition }));
        window.dispatchEvent(new Event('mouseup'));

        expect(onChangeHeightFn.mock.calls.length).toBe(1);
    });

    it('should disable CSS transitions while dragging', () => {
        const controlBar = mount(<ControlBar onChangeHeight={noop}><div className="c" /></ControlBar>, {
            context: getStubContext(),
        });
        const dragFlap = controlBar.find('.c + div > div');

        expect(controlBar.find('.d2-ui-control-bar').props().style.transition).not.toBe('none');
        dragFlap.simulate('mousedown');
        expect(controlBar.find('.d2-ui-control-bar').props().style.transition).toBe('none');
        window.dispatchEvent(new Event('mouseup'));
        expect(controlBar.find('.d2-ui-control-bar').props().style.transition).not.toBe('none');
    });

    it('should complain if an invalid height is specified', () => {
        jest.spyOn(console, 'error').mockImplementation(noop);
        const c = console; // Circumvent eslint

        renderControlBar({ height: 0 });
        expect(c.error.mock.calls.length).toBe(1);

        c.error.mockRestore();
    });

    it('should not start listening for mouse move events if no onChangeHeight callback is specified', () => {
        jest.spyOn(window, 'addEventListener');

        const controlBar = mount(<ControlBar onExpandClick={noop}><div className="c" /></ControlBar>, {
            context: getStubContext(),
        });
        const dragFlap = controlBar.find('.c + div > div');

        dragFlap.last().simulate('mousedown');

        // Material-UI/Button adds a 'keydown' event handler, so ignore that one
        expect(window.addEventListener.mock.calls.filter(args => args[0] !== 'keydown').length).toBe(0);

        window.addEventListener.mockRestore();
    });
});
