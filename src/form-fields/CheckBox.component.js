import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';


// TODO: Rewrite as ES6 class
/* eslint-disable react/prefer-es6-class */
export default React.createClass({
    propTypes: {
        onChange: PropTypes.func.isRequired,
    },

    render() {
        const {
            errorStyle,
            errorText,
            ...other
        } = this.props;
        return (
            <div style={{ marginTop: 12, marginBottom: 12 }}>
                <Checkbox onCheck={this.props.onChange} {...other} />
            </div>
        );
    },
});
