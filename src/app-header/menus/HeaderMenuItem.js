import React, { Component, PropTypes } from 'react';
import styles from '../header-bar-styles';
import { search, setSearchFieldFocusTo } from '../search/search.stores';

const onMouseUp = (link) => () => {
    search('');
    setSearchFieldFocusTo(false);
    window.location = link;
};

export default class HeaderMenuItem extends Component {
    constructor() {
        super();

        this.state = {
            hovering: false,
        };

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    render() {
        const props = this.props;

        const itemStyle = Object.assign({
            backgroundColor: props.selected || this.state.hovering ? '#F5F5F5' : 'transparent',
        }, styles.menuItemLink);

        return (
            <a href={props.action} onMouseUp={onMouseUp(props.action)} style={itemStyle} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                <div><img style={styles.menuItemIcon} src={props.icon}/></div>
                <div style={{textAlign: 'center'}}>{props.label}</div>
            </a>
        );
    }

    onMouseEnter() {
        this.setState({
            hovering: true,
        });
    }

    onMouseLeave() {
        this.setState({
            hovering: false,
        });
    }
}
HeaderMenuItem.propTypes = {
    action: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string,
};
