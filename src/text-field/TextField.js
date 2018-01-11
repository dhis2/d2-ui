import React from 'react';
import PropTypes from 'prop-types';
import MuiTextField from 'material-ui/TextField';
import { createClassName } from '../component-helpers/utils';

const TextField = ({ type,
    fullWidth,
    label,
    multiline,
    onChange,
    placeholder,
    rows,
    rowsMax,
    selector,
    style,
    value,
}) => {
    const className = createClassName('d2-ui-textfield', selector);

    return (
        <MuiTextField
            className={className}
            floatingLabelText={label}
            fullWidth={fullWidth}
            hintText={placeholder}
            multiLine={multiline}
            onChange={(event, val) => onChange(val)}
            rows={rows}
            rowsMax={rowsMax}
            style={style}
            type={type}
            value={value}
        />
    );
};


TextField.propTypes = {
    /**
     * If set, expands the TextField to the full width of its parent
     */
    fullWidth: PropTypes.bool,

    /**
     * The textfield label
     */
    label: PropTypes.string,

    /**
     * If set, allows textfield to expand to more than one line
     */
    multiline: PropTypes.bool,

    /**
     * onChange callback, that is fired when the textfield's value changes
     *
     * The onChange callback will receive one argument: The new value of the text field
     */
    onChange: PropTypes.func.isRequired,

    /**
     * If set, sets the Hint text (v0.19)
     */
    placeholder: PropTypes.string,

    /**
     * If set, and multiline is true, sets the initial number of lines
     */
    rows: PropTypes.number,

    /**
     * If set, and multiline is true, sets the maximum number of lines
     */
    rowsMax: PropTypes.number,

    /**
     * If set, adds a class to the element in the format d2-ui-textfield-selector
     */
    selector: PropTypes.string,

    /**
     * Override the inline-styles of the root element
     */
    style: PropTypes.object,

    /**
     * The input type of the textfield
     */
    type: PropTypes.oneOf(['text', 'number']),

    /**
     * The value of the textfield
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

TextField.defaultProps = {
    fullWidth: false,
    label: null,
    multiline: false,
    placeholder: '',
    rows: 1,
    rowsMax: null,
    selector: null,
    style: {},
    type: 'text',
    value: '',
};


export default TextField;
