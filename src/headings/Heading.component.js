import {PropTypes, createClass, default as React} from 'react';

export default createClass({
    propTypes: {
        level: PropTypes.number,
        text: PropTypes.string.isRequired,
    },

    getDefaultProps() {
        return {
            level: 1,
        };
    },

    render() {
        const {
            level,
            text,
            ...other,
            } = this.props;

        const tag = {type: `h${level}`};

        if (level > 6) {
            return null;
        }

        return (
            <tag.type {...other}>{text}</tag.type>
        );
    },
});
