import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';


// TODO: Rewrite as ES6 class
/* eslint-disable react/prefer-es6-class */
export default React.createClass({
    propTypes: {
        value: PropTypes.string,
        multiLine: PropTypes.bool,
    },

    getInitialState() {
        return {
            value: this.props.value,
        };
    },

    componentWillReceiveProps(props) {
        this.setState({ value: props.value });
    },

    change(e) {
        this.setState({ value: e.target.value });
    },

    render() {
        const {
            changeEvent,
            ...other
        } = this.props;
        const errorStyle = {
            lineHeight: this.props.multiLine ? '48px' : '12px',
            marginTop: this.props.multiLine ? -16 : 0,
        };

        return (
            <TextField
                errorStyle={errorStyle}
                {...other}
                value={this.state.value}
                onChange={this.change}
            />
        );
    },
});
