import React from 'react';
import PropTypes from 'prop-types';
import { getRestProps } from '../component-helpers/utils';

const icons = {
    star: 'star',
};

const fetchComponent = (icon) => {
    switch (icon) {
    case icons.star:
        return import('material-ui/svg-icons/toggle/star');
    default:
        return import('material-ui/SvgIcon');
    }
};

export default class SvgIcon extends React.Component {
    state = { Icon: null };

    componentWillMount() {
        const { icon, children } = this.props;

        if (!icons.hasOwnProperty(icon) && !children) {
            return;
        }

        fetchComponent(icon)
            .then(component => this.setState({ Icon: component.default }));
    }

    render() {
        const { Icon } = this.state;
        const omitProps = [
            'icon',  // icon used internally only
            'color', // color is a v0.19 prop and not supported in v1.0.0 (use style property instead)
        ];

        if (!Icon) {
            return <div>Loading icon...</div>;
        }

        const rest = getRestProps(this.props, omitProps);
        const { children } = this.props;

        return (
            <Icon {...rest}>
                {children}
            </Icon>
        );
    }
}

SvgIcon.propTypes = {
    icon: PropTypes.string,
    children: PropTypes.node,
};

SvgIcon.defaultProps = {
    icon: '',
    children: null,
};
