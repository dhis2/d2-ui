import React from 'react';
import PropTypes from 'prop-types';
import MuiSelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import isString from 'lodash/fp/isString';
import { createClassName } from '../component-helpers/utils';

const SelectField = ({ label, items, multiple, value, onChange, style, selector, loading, errorText, children }) => {
    const className = createClassName('d2-ui-selectfield', selector);
    let listStyle;

    if (loading === true) {
        listStyle = {
            textAlign: 'center',
        };
    } else if (isString(loading)) {
        listStyle = {
            paddingLeft: 24,
            lineHeight: '32px',
            fontStyle: 'italic',
        };
    }

    return (
        <MuiSelectField
            floatingLabelText={label}
            value={value}
            multiple={multiple}
            onChange={onChange ? (event, index, value) => onChange(items[index] || value) : null}
            className={className}
            style={style}
            listStyle={listStyle}
            errorText={errorText}
        >
            {loading === true && <CircularProgress size={30} />}
            {isString(loading) && <div>{loading}</div>}

            {!loading && children ? children : items.map(item => (
                <MenuItem
                    key={item.id}
                    value={item.id}
                    primaryText={item.name}
                    insetChildren={multiple}
                    checked={multiple && Array.isArray(value) && value.indexOf(item.id) > -1}
                />
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
     * If true, the select field will support multiple selection. A check mark will show before selected items.
     */
    multiple: PropTypes.bool,

    /**
     * If true, a spinner will be shown in the select menu. If string, the loading text will be shown.
     */
    loading: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string
    ]),

    /**
     * onChange callback, that is fired when the select field's value changes
     *
     * The onChange callback will receive one argument: The item selected (if items are provided) or the value selected
     */
    onChange: PropTypes.func,

    /**
     * The value(s) of the select field
     */
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]))
    ]),

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
    loading: false,
};


export default SelectField;
