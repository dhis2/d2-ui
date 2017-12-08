import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';

class CheckBox extends Component {
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
    }
}

CheckBox.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default CheckBox;
