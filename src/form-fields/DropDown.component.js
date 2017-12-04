import PropTypes from 'prop-types';
import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

function renderMenuItem({ value, text }) {
    return (<MenuItem key={value} value={value} primaryText={text} />);
}

function renderMenuItems({ menuItems, includeEmpty, emptyLabel }) {
    const renderedMenuItems = menuItems.map(({ id, displayName }) => renderMenuItem({ value: id, text: displayName }));

    if (includeEmpty) {
        renderedMenuItems.unshift(renderMenuItem({ value: 'null', text: emptyLabel }));
    }
    return renderedMenuItems;
}

function createCallbackWithFakeEventFromMaterialSelectField(callback) {
    return (event, index, value) => callback({ target: { value } });
}

function DropDown({ onFocus, onBlur, onChange, value, disabled, menuItems, includeEmpty, emptyLabel, noOptionsLabel, ...other }) {
    const menuItemArray = Array.isArray(menuItems) ? menuItems : menuItems.toArray();
    const hasOptions = menuItemArray.length > 0;

    return (
        <SelectField
            value={hasOptions ? value : 1}
            onChange={createCallbackWithFakeEventFromMaterialSelectField(onChange)}
            disabled={!hasOptions || disabled}
            {...other}
        >
            {hasOptions
                ? renderMenuItems({ menuItems: menuItemArray, includeEmpty, emptyLabel })
                : <MenuItem value={1} primaryText={noOptionsLabel} />
            }
        </SelectField>
    );
}

DropDown.propTypes = {
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
    ]),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
    ]),
    menuItems: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    noOptionsLabel: PropTypes.string,
    includeEmpty: PropTypes.bool,
    emptyLabel: PropTypes.string,
};

DropDown.defaultProps = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
    ]),
    menuItems: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]),
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    noOptionsLabel: '-',
    includeEmpty: false,
    emptyLabel: '',
};

export default DropDown;
