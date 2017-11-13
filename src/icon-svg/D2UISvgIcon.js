import React from 'react';
import PropTypes from 'prop-types';

const icons = {
    star: 'star',
    game: 'game',
};

const fetchComponent = (icon) => {
    switch (icon) {
    case icons.star:
        return import('material-ui/svg-icons/toggle/star');
    case icons.game:
        return import('material-ui/svg-icons/hardware/videogame-asset');
    default:
        return Promise.reject('Icon name is missing or not recognized');
    }
};

export default class D2UISvgIcon extends React.Component {
    state = { Icon: null };

    // async componentWillMount() {
    //     const { icon } = this.props;
    //     const component = await fetchComponent(icon);
    //     this.setState({ Icon: component.default });
    // }
    componentWillMount() {
        const { icon } = this.props;
        fetchComponent(icon)
            .then(component => this.setState({ Icon: component.default }));
    }

    render() {
        const { Icon } = this.state;

        if (!Icon) {
            return <div>Loading icon...</div>;
        }

        return <Icon />;
    }
}

D2UISvgIcon.propTypes = {
    icon: PropTypes.string.isRequired,
};
