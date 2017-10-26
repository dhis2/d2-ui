import React from 'react';
import PropTypes from 'prop-types';
import MuiSelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const SelectField = ({ label, items, value, onChange, style, selector }) => {
    let className = 'd2-ui-selectfield';

    if (selector) {
        className = `${className} ${className}-${selector}`;
    }

    return (
        <MuiSelectField
            floatingLabelText={label}
            value={value}
            onChange={(event, index) => onChange(items[index])}
            className={className}
            style={style}
        >
            {items.map(item => (
                <MenuItem
                    key={item.id}
                    value={item.id}
                    primaryText={item.name}
                />
            ))}
        </MuiSelectField>
    );
};


SelectField.propTypes = {

    label: PropTypes.string,

    items: PropTypes.array,

    onChange: PropTypes.func.isRequired,

    value: PropTypes.string,

    /**
     * Override the inline-styles of the root element
     */
    style: PropTypes.object,

    /**
     * If set, adds a class to the element in the format d2-ui-textfield-selector
     */
    selector: PropTypes.string,
};


SelectField.defaultProps = {
    items: [],
};


export default SelectField;
