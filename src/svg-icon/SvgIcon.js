import React from 'react';
import PropTypes from 'prop-types';

const getRestProps = (props) => {
    const omitProps = ['icon'];

    return Object.keys(props).reduce((acc, key) => { // eslint-disable-line arrow-body-style
        return omitProps.indexOf(key) === -1 ? { ...acc, [key]: props[key] } : acc;
    }, {});
};

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
        const rest = getRestProps(this.props);

        if (!Icon) {
            return <div>Loading icon...</div>;
        }

        return <Icon {...rest} />;
    }
}

SvgIcon.propTypes = {
    icon: PropTypes.oneOf([icons.star]).isRequired,
};
