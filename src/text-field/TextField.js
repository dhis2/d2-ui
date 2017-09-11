import React from 'react';
import PropTypes from 'prop-types';
import MuiTextField from 'material-ui/TextField';

const TextField = ({ type, label, value, onChange, style }) => (
    <MuiTextField
        type={type}
        floatingLabelText={label}
        value={value}
        onChange={(event, value) => onChange(value)}
        style={style}
    />
);

TextField.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    style: PropTypes.object,
};

export default TextField;
