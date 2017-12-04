import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiTextField from 'material-ui/TextField';

class TextField extends Component {
    constructor(props) {
        super(props);
        this.change = this.change.bind(this);
        this.state = {
            value: this.props.value,
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value });
    }

    change(e) {
        this.setState({ value: e.target.value });
    }

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
            <MuiTextField errorStyle={errorStyle} {...other} value={this.state.value} onChange={this.change} />
        );
    }
}

TextField.propTypes = {
    value: PropTypes.string,
    multiLine: PropTypes.bool,
};

TextField.defaultProps = {
    value: '',
    multiLine: false,
};

export default TextField;
