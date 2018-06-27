import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styles = {
    userMention: {
        cursor: 'pointer',
        padding: '5px 15px',
        borderBottom: '1px solid rgb(224, 224, 224)',
        fontSize: '0.75rem',
    },
    userMentionSelected: {
        backgroundColor: '#ACD',
    },
};

class UserMatch extends Component {
    onUserClick = () => {
        this.props.onClick(this.props.user);
    };

    onChangeSelected = isSelected => () => {
        this.props.onMouseSelected(this.props.user, isSelected);
    };

    render() {
        const { user, isSelected, pattern } = this.props;
        const style = { ...styles.userMention, ...(isSelected ? styles.userMentionSelected : {}) };
        const text = `${user.displayName} (${user.userCredentials.username})`;

        let formatted = text;

        if (pattern) {
            formatted = text.split(new RegExp(`(${pattern})`, 'gi')).map((part, idx) => {
                if (part.toLowerCase() === pattern.toLowerCase()) {
                    return <b key={idx}>{part}</b>;
                }

                return part;
            });
        }

        return (
            <li
                style={style}
                onClick={this.onUserClick}
                onMouseEnter={this.onChangeSelected(true)}
                onMouseLeave={this.onChangeSelected(false)}
            >
                <span>{formatted}</span>
            </li>
        );
    }
}

UserMatch.defaultProps = {
    onClick: null,
    onMouseSelected: null,
    isSelected: false,
    pattern: null,
    user: null,
};

UserMatch.propTypes = {
    onClick: PropTypes.func,
    onMouseSelected: PropTypes.func,
    isSelected: PropTypes.bool,
    pattern: PropTypes.string,
    user: PropTypes.object,
};

export default UserMatch;
