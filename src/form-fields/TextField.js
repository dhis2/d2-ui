import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiTextField from 'material-ui/TextField';
import TextFieldTemp from '../../src/text-field/TextFieldTemp';


class TextField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ value: props.value });
    }

    change = (event) => {
        this.setState({ value: event.target.value });
    };

    render() {
        const {
            changeEvent,
            errorStyle,
            errorText,
            ...other
        } = this.props;

        /* const errorStyle = {
            lineHeight: this.props.multiLine ? '48px' : '12px',
            marginTop: this.props.multiLine ? -16 : 0,
        }; */

        console.log(other);
        return (
            <TextFieldTemp {...other} value={this.state.value} onChange={this.change} />
        //  <MuiTextField errorStyle={errorStyle} {...other} value={this.state.value} onChange={this.change} /> 
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
