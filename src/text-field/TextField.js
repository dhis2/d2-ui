import React from 'react';
import PropTypes from 'prop-types';
import MuiTextField from 'material-ui/TextField';
import { createClassName } from '../component-helpers/utils';

const TextField = ({ type, label, value, onChange, style, selector }) => {
    const className = createClassName('d2-ui-textfield', selector);

    return (
        <MuiTextField
            type={type}
            floatingLabelText={label}
            value={value}
            onChange={(event, value) => onChange(value)}
            className={className}
            style={style}
        />
    );
};


TextField.propTypes = {
    /**
     * The input type of the textfield
     */
    type: PropTypes.oneOf(['text', 'number']),

    /**
     * The textfield label
     */
    label: PropTypes.string,

    /**
     * The value of the textfield
     */
    value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),

    /**
     * onChange callback, that is fired when the textfield's value changes
     *
     * The onChange callback will receive one argument: The new value of the text field
     */
    onChange: PropTypes.func.isRequired,

    /**
     * Override the inline-styles of the root element
     */
    style: PropTypes.object,

    /**
     * If set, adds a class to the element in the format d2-ui-textfield-selector
     */
    selector: PropTypes.string,
};

export default TextField;
