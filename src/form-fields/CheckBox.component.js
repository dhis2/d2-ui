import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';

const CheckBox = ({ onChange, wrapperStyle, errorStyle, errorText, ...other }) => {
    const baseWrapperStyle = { marginTop: 12, marginBottom: 12 };
    const mergedWrapperStyle = {
        ...baseWrapperStyle,
        ...wrapperStyle,
    };
    return (
        <div style={mergedWrapperStyle}>
            <Checkbox onCheck={onChange} {...other} />
        </div>
    );
};

CheckBox.propTypes = {
    wrapperStyle: PropTypes.object,
    errorStyle: PropTypes.object,
    errorText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

CheckBox.defaultProps = {
    wrapperStyle: {},
    errorStyle: {},
    errorText: '',
};

export default CheckBox;
