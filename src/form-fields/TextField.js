import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

class TextField extends Component {
    getInitialState() {
        return {
            value: this.props.value,
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value });
    }

    _change(e) {
        this.setState({ value: e.target.value });
    }

    render() {
        const errorStyle = {
            lineHeight: this.props.multiLine ? '48px' : '12px',
            marginTop: this.props.multiLine ? -16 : 0,
        };

        return (
            <TextField errorStyle={errorStyle} {...this.props} value={this.state.value} onChange={this._change} />
        );
    }
}

TextField.propTypes = {
    value: PropTypes.string,
    multiLine: PropTypes.bool,
};

export default TextField;
