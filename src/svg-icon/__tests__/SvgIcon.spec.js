import React from 'react';
import { shallow } from 'enzyme';
import SvgIcon from '../SvgIcon';
import * as utils from '../../component-helpers/utils';

describe('SvgIcon', () => {
    const renderWithProps = props => shallow(<SvgIcon {...props} />);

    const resolvePromise = () => {
        return Promise.resolve('promise resolved').then();
    };

    it('should render a star icon', () => {
        const wrapper = renderWithProps({ icon: 'star' });

        return resolvePromise().then(() => {
            expect(wrapper.text()).toContain('ToggleStar');
        });
    });

    it('should render a Loading message if invalid icon name supplied', () => {
        const wrapper = renderWithProps({ icon: 'notthere' });

        return resolvePromise().then(() => {
            expect(wrapper.text()).toContain('Loading');
        });
    });

    it('should render a custom SvgIcon when child node provided', () => {
        const children = <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />;
        const props = {
            style: {
                color: 'green',
            },
        };
        const wrapper = shallow(<SvgIcon {...props}>{children}</SvgIcon>);

        return resolvePromise().then(() => {
            expect(wrapper.text()).toContain('SvgIcon');
        });
    });

    it('should not pass the "color" property on to the material-ui icon', () => {
        const props = {
            icon: 'star',
            color: 'blue',
        };
        const spy = jest.spyOn(utils, 'getRestProps');

        renderWithProps(props);

        return resolvePromise().then(() => {
            expect(spy).toHaveBeenCalled();
            expect(spy.mock.calls[0][0]).toEqual(expect.objectContaining(props));
            expect(spy.mock.calls[0][1]).toEqual(expect.arrayContaining(['icon', 'color']));
            spy.mockReset();
            spy.mockRestore();
        });
    });

    it('should pass the "hoverColor" property on to the material-ui icon', () => {
        const props = {
            icon: 'star',
            style: {
                color: 'green',
            },
        };
        const spy = jest.spyOn(utils, 'getRestProps');

        renderWithProps(props);

        return resolvePromise().then(() => {
            expect(spy).toHaveBeenCalled();
            expect(spy.mock.calls[0][0]).toEqual(expect.objectContaining(props));
            expect(spy.mock.calls[0][1]).not.toEqual(expect.arrayContaining(['hoverColor']));
            spy.mockReset();
            spy.mockRestore();
        });
    });

    it('should pass the "style" property on to the material-ui icon', () => {
        const props = {
            icon: 'star',
            style: {
                color: 'green',
            },
        };
        const spy = jest.spyOn(utils, 'getRestProps');

        renderWithProps(props);

        return resolvePromise().then(() => {
            expect(spy).toHaveBeenCalled();
            expect(spy.mock.calls[0][0]).toEqual(expect.objectContaining(props));
            expect(spy.mock.calls[0][1]).not.toEqual(expect.arrayContaining(['style']));
            spy.mockReset();
            spy.mockRestore();
        });
    });
});
