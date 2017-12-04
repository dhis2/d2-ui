import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';

class CheckBox extends Component {
    render() {
        return (
            <div style={{ marginTop: 12, marginBottom: 12 }}>
                <Checkbox onCheck={this.props.onChange} {...this.props} />
            </div>
        );
    }
}

CheckBox.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default CheckBox;
