import PropTypes from 'prop-types';
import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

function renderMenuItem(id, displayName) {
    return (<MenuItem key={id} value={id} primaryText={displayName} />);
}

function renderMenuItems({ menuItems, includeEmpty, emptyLabel }) {
    const renderedMenuItems = menuItems.map(({ id, displayName }) => renderMenuItem(id, displayName));

    if (includeEmpty) {
        renderedMenuItems.unshift(renderMenuItem({ value: 'null', text: emptyLabel }));
    }
    return renderedMenuItems;
}

function createCallbackWithFakeEventFromMaterialSelectField(callback) {
    return (event, index, value) => callback({ target: { value } });
}


function DropDown({ fullWidth, onFocus, onBlur, onChange, value, disabled, menuItems, hintText, includeEmpty, emptyLabel, noOptionsLabel, ...other }) {
    const menuItemArray = Array.isArray(menuItems) ? menuItems : menuItems.toArray();
    const hasOptions = menuItemArray.length > 0;
    return (
        <SelectField
            value={hasOptions ? value : 1}
            fullWidth
            hintText={hintText}
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
    disabled: PropTypes.bool,
    fullWidth: PropTypes.bool,
    onBlur: PropTypes.func,
    hintText: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    noOptionsLabel: PropTypes.string,
    includeEmpty: PropTypes.bool,
    emptyLabel: PropTypes.string,
};

DropDown.defaultProps = {
    value: null,
    menuItems: [],
    disabled: false,
    fullWidth: false,
    hintText: 'Select item',
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    noOptionsLabel: '-',
    includeEmpty: false,
    emptyLabel: '',
};

export default DropDown;
