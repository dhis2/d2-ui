import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui-next/TextField';
import { createClassName } from '../component-helpers/utils';

// const d2DefaultStyle = {};

const TextFieldTemp = (props) => {
    const { selector, ...passThroughProps } = props;
    const className = createClassName('d2-ui-textfieldtemp', selector);

    return (<TextField {...passThroughProps} />);
};

TextFieldTemp.propTypes = {
    /**
     * If set, helps users fill forms faster with specific auto-complete alternatives.
     */
    autoComplete: PropTypes.string,

    /**
     * If set, sets the defaultValue of the <Input/> element.
     */
    defaultValue: PropTypes.string,

    /**
     * If true, the label will be dsiplayed in an error state.
     */
    error: PropTypes.bool,

    /**
     * If true, expands the <TextField> to the full width of its container.
     */
    fullWidth: PropTypes.bool,

    /**
     * If set, sets the helper text content.
     */
    helperText: PropTypes.node,

    /**
     * The id of the <input/> element, use to make the "label" and "helperText" properties
     * accesible for screen readers. 
     */
    id: PropTypes.string,

    /**
     * If set, sets properties for the <InputLabel/> element.
     */
    InputLabelProps: PropTypes.object,

    /**
     * If set, sets properties for the <Input/> element.
     */
    InputProps: PropTypes.object,

    /**
     * If set, sets the label content.
     */
    label: PropTypes.node,

    /**
     * If set, sets the CSS class name for the label element.
     */
    labelClassName: PropTypes.string,

    /**
     * If "dense" or "normal", adjusts vertical spacing for this and contained components.
     */
    margin: PropTypes.oneOf(['none', 'dense', 'normal']),

    /**
     * If true, renders a "textarea" element instead of an input.
     */
    multiline: PropTypes.bool,

    /**
     * If true, sets the name attribute of the <input/> element
     */
    name: PropTypes.string,

    /**
     * Callback fired when value is changed, requried property:
     * 
     *      function(event: object) => void
     * 
     * event: The event source of the callback. 
     */
    onChange: PropTypes.func.isRequired,

    /**
     * If set, sets the short hint displayed in the input before the user enters a value.
     */
    placeholder: PropTypes.string,

    /**
     * Sets the number of rows to display when multiline option is set to true.
     */
    rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Sets the maximum number of rows to display when multiline option is set to true
     */
    rowsMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * If true, renders a <Select/> element while passing the <Input/> element to <Select/> as
     * <input/> parameter. If this option is true you must pass the options of the <Select/> as
     * children.
     */
    select: PropTypes.bool,

    /**
     * If set, adds a class to the element in the format d2-ui-textfield-selector
     */
    selector: PropTypes.string,

    /**
     * Ovverride the inline-styles of the root element
     */
    style: PropTypes.object,

    /**
     * Sets the properties for the <Select/> element when select option is set to true.
     */
    SelectProps: PropTypes.object,

    /**
     * If set, sets the type attribute of the <Input/> element. It should be a valid HTML5
     * input type.
     */
    type: PropTypes.string,

    /**
     * If set, sets the value of the <Input/> element, required for a controlled component
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

};

TextFieldTemp.defaultProps = {
    autoComplete: undefined,
    defaultValue: undefined,
    error: false,
    fullWidth: false,
    helperText: undefined,
    id: undefined,
    InputLabelProps: undefined,
    InputProps: undefined,
    label: undefined,
    labelClassName: undefined,
    margin: undefined,
    multiline: false,
    name: undefined,
    placeholder: undefined,
    rows: undefined,
    rowsMax: undefined,
    select: undefined,
    selector: undefined,
    style: undefined,
    SelectProps: undefined,
    type: undefined,
    value: undefined,
};

export default TextFieldTemp;
