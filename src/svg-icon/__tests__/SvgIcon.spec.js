import React from 'react';
import { shallow } from 'enzyme';
import SvgIcon from '../SvgIcon';
import * as utils from '../../component-helpers/utils';

describe('SvgIcon', () => {
    const renderWithProps = props => shallow(<SvgIcon {...props} />);

    it('should render a star icon', () => {
        const promise = Promise.resolve('promise resolved');
        const props = {
            icon: 'star',
        };
        const wrapper = renderWithProps(props);

        return promise
            .then(() => {
                // wrapper.update();
            })
            .then(() => {
                expect(wrapper.text()).toContain('ToggleStar');
            });
    });

    it('should render a Loading message if invalid icon name supplied', () => {
        const promise = Promise.resolve('promise resolved');
        const props = {
            icon: 'notthere',
        };
        const wrapper = renderWithProps(props);

        return promise
            .then(() => {
                // wrapper.update();
            })
            .then(() => {
                expect(wrapper.text()).toContain('Loading');
            });
    });

    it('should not pass the "color" property on to the material-ui icon', () => {
        const promise = Promise.resolve('promise resolved');
        const props = {
            icon: 'star',
            color: 'blue',
        };
        const spy = jest.spyOn(utils, 'getRestProps');

        renderWithProps(props);

        return promise
            .then(() => {})
            .then(() => {
                expect(spy).toHaveBeenCalled();
                expect(spy.mock.calls[0][0]).toEqual(expect.objectContaining(props));
                expect(spy.mock.calls[0][1]).toEqual(expect.arrayContaining(['icon', 'color']));
                spy.mockReset();
                spy.mockRestore();
            });
    });

    it('should pass the "hoverColor" property on to the material-ui icon', () => {
        const promise = Promise.resolve('promise resolved');
        const props = {
            icon: 'star',
            hoverColor: 'yellow',
            style: {
                color: 'green',
            },
        };
        const spy = jest.spyOn(utils, 'getRestProps');

        renderWithProps(props);

        return promise
            .then(() => {})
            .then(() => {
                expect(spy).toHaveBeenCalled();
                expect(spy.mock.calls[0][0]).toEqual(expect.objectContaining(props));
                expect(spy.mock.calls[0][1]).not.toEqual(expect.arrayContaining(['hoverColor']));
                spy.mockReset();
                spy.mockRestore();
            });
    });

    it('should pass the "style" property on to the material-ui icon', () => {
        const promise = Promise.resolve('promise resolved');
        const props = {
            icon: 'star',
            style: {
                color: 'green',
            },
        };
        const spy = jest.spyOn(utils, 'getRestProps');

        renderWithProps(props);

        return promise
            .then(() => {})
            .then(() => {
                expect(spy).toHaveBeenCalled();
                expect(spy.mock.calls[0][0]).toEqual(expect.objectContaining(props));
                expect(spy.mock.calls[0][1]).not.toEqual(expect.arrayContaining(['style']));
                spy.mockReset();
                spy.mockRestore();
            });
    });
});
