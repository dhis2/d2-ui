import React from 'react';
import { shallow, mount } from 'enzyme';
import PropTypes from 'prop-types';

import { getStubContext } from '../../../../../config/inject-theme';

import ControlBar, { END_FLAP_HEIGHT } from '../ControlBar';

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
        expect(renderControlBar({}).find('.d2-ui-control-bar-contents + div').length).toBe(1);
    });

    it('should set the height of the end flap to 0 by default', () => {
        expect(renderControlBar({}).find('.d2-ui-control-bar-contents + div').props().style.height).toBe(0);
    });

    it('should set the height of the end flap to 10 when an onChangeHeight callback is specified', () => {
        const controlBar = renderControlBar({ onChangeHeight: noop });
        expect(controlBar.find('.d2-ui-control-bar-contents + div').props().style.height).toBe(END_FLAP_HEIGHT);
    });

    it('should change the background color in edit mode', () => {
        expect(renderControlBar({ editMode: true }).props().style.background).not.toBe('white');
    });

    it('should change height when an onChangeHeight callback is specified', () => {
        const plainBar = renderControlBar();
        const draggableBar = renderControlBar({ onChangeHeight: noop });
        expect(draggableBar.props().style.height).not.toBe(plainBar.props().style.height);
    });

    it('should call the onChangeHeight callback when the "flap" is dragged', () => {
        // Replace the async DOM function with a sync function that immediately executes the callback
        window.requestAnimationFrame = requestAnimationFrame;

        const onChangeHeightFn = jest.fn();
        const controlBar = mount(<ControlBar onChangeHeight={onChangeHeightFn}><div className="c" /></ControlBar>, {
            context: getStubContext(),
        });
        const dragFlap = controlBar.find('.d2-ui-control-bar-contents + div > div');

        dragFlap.simulate('mousedown');
        window.dispatchEvent(new MouseEvent('mousemove', { clientY: 1234 }));
        window.dispatchEvent(new Event('mouseup'));

        expect(onChangeHeightFn.mock.calls.length).toBe(1);
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
        const dragFlap = controlBar.find('.d2-ui-control-bar-contents + div > div');

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
        const dragFlap = controlBar.find('.d2-ui-control-bar-contents + div > div');

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
        const spy = jest.spyOn(window, 'addEventListener');

        const controlBar = mount(<ControlBar>...</ControlBar>, { context: getStubContext() });
        const dragFlap = controlBar.find('.d2-ui-control-bar-contents + div > div');

        dragFlap.last().simulate('mousedown');
        const eventHandlers = window.addEventListener.mock.calls.map(args => args[0]);
        expect(eventHandlers.includes('mousemove')).toBe(false);
        expect(eventHandlers.includes('mouseup')).toBe(false);

        spy.mockReset();
        spy.mockRestore();
    });

    it('should start listening for mousemove and mouseup events when the drag flap is clicked', () => {
        const spy = jest.spyOn(window, 'addEventListener');

        const controlBar = mount(<ControlBar onChangeHeight={noop}>...</ControlBar>, { context: getStubContext() });
        const dragFlap = controlBar.find('.d2-ui-control-bar-contents + div > div');

        dragFlap.last().simulate('mousedown');
        const eventHandlers = window.addEventListener.mock.calls.map(args => args[0]);
        expect(eventHandlers.includes('mousemove')).toBe(true);
        expect(eventHandlers.includes('mouseup')).toBe(true);

        spy.mockReset();
        spy.mockRestore();
    });
});
