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
        return Promise.reject('Icon name is missing or not recognized');
    }
};

export default class SvgIcon extends React.Component {
    state = { Icon: null };

    componentWillMount() {
        const { icon } = this.props;
        fetchComponent(icon)
            .then(component => this.setState({ Icon: component.default }));
    }

    render() {
        const { Icon } = this.state;
        const omitProps = [
            'icon',  // icon used internally only
            'color', // color is not supported in 1.0.0 (use style property instead)
        ];

        if (!Icon) {
            return <div>Loading icon...</div>;
        }

        const rest = getRestProps(this.props, omitProps);
        return <Icon {...rest} />;
    }
}

SvgIcon.propTypes = {
    icon: PropTypes.oneOf([icons.star]).isRequired,
};
