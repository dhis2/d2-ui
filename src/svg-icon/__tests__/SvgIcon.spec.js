import React from 'react';
import { shallow } from 'enzyme';
import SvgIcon from '../SvgIcon';

describe('SvgIcon', () => {
    const icon = props => shallow(<SvgIcon {...props} />);

    it('should render a predefined material icon', () => {
        expect(icon({ icon: 'Star' }).find('ToggleStar').length).toBe(1);
    });

    it('should render a Dissatisfied Icon if invalid icon name supplied', () => {
        const el = icon({ icon: 'missing' });

        expect(el.find('SocialSentimentDissatisfied').length).toBe(1);
    });

    it('should render a custom SvgIcon when child node provided', () => {
        const children = <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />;
        const customIcon = shallow(<SvgIcon>{children}</SvgIcon>);

        expect(customIcon.find('SvgIcon').length).toBe(1);
    });

    it('should not pass the "color" property on to the material-ui icon', () => {
        const props = { icon: 'Star', color: 'blue' };
        const el = icon(props).find('ToggleStar');

        expect(el.props()).not.toHaveProperty('color');
    });

    it('should not pass the "hoverColor" property on to the material-ui icon', () => {
        const props = { icon: 'Star', hoverColor: 'blue' };
        const el = icon(props).find('ToggleStar');

        expect(el.props()).not.toHaveProperty('hoverColor');
    });

    it('should pass the "className" property on to the material-ui icon', () => {
        const props = { icon: 'Star', className: 'my-starry-icon' };
        const el = icon(props).find('ToggleStar');

        expect(el.props()).toHaveProperty('className');
    });

    it('should not pass the "style" property on to the material-ui icon', () => {
        const props = {
            icon: 'Star',
            style: {
                fill: 'green',
            },
        };
        const el = icon(props).find('ToggleStar');

        expect(el.props()).not.toHaveProperty('style');
    });
});
