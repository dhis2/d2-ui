import React from 'react';
import PropTypes from 'prop-types';
import MuiSelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const SelectField = ({ label, items, value, onChange, style, selector, children }) => {
    let className = 'd2-ui-selectfield';

    if (selector) {
        className = `${className} ${className}-${selector}`;
    }

    return (
        <MuiSelectField
            floatingLabelText={label}
            value={value}
            onChange={(event, index, value) => onChange(items[index] || value)}
            className={className}
            style={style}
        >
            {children ? children : items.map(item => (
                <MenuItem key={item.id} value={item.id} primaryText={item.name} />
            ))}
        </MuiSelectField>
    );
};


SelectField.propTypes = {

    /**
     * The label of the select field
     */
    label: PropTypes.string,

    /**
     * The select field items (rendered as MenuItems)
     */
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired,
        name: PropTypes.string,
    })),

    /**
     * onChange callback, that is fired when the select field's value changes
     *
     * The onChange callback will receive one argument: The item selected (if items are provided) or the value selected
     */
    onChange: PropTypes.func.isRequired,

    /**
     * The value of the select field
     */
    value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),

    /**
     * Override the inline-styles of the root element
     */
    style: PropTypes.object,

    /**
     * If set, adds a class to the element in the format d2-ui-selectfield-selector
     */
    selector: PropTypes.string,
};


SelectField.defaultProps = {
    items: [],
};


export default SelectField;
