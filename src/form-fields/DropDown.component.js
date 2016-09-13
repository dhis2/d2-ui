import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

function renderMenuItem({ value, text }) {
    return (<MenuItem key={value} value={value} primaryText={text}/>);
}

function renderMenuItems({ menuItems, includeEmpty, emptyLabel }) {
    const renderedMenuItems = menuItems.map(({ id, displayName }) => renderMenuItem({ value: id, text: displayName }));

    if (includeEmpty) {
        renderedMenuItems.unshift(renderMenuItem({ value: 'null', text: emptyLabel }));
    }

    return renderedMenuItems;
}

function createCallbackWithFakeEventFromMaterialSelectField(callback) {
    return (event, index, value) => callback({target: {value: value}});
}

function DropDown({ onFocus, onBlur, onChange, value, disabled, menuItems, includeEmpty, emptyLabel, noOptionsLabel, ...other }) {
    const menuItemArray = Array.isArray(menuItems) && menuItems || menuItems.toArray();
    const hasOptions = menuItemArray.length > 0;

    return (
        <SelectField
            value={hasOptions ? value : 1}
            onChange={createCallbackWithFakeEventFromMaterialSelectField(onChange)}
            disabled={!hasOptions || disabled}
            {...other}>
            {hasOptions
                ? renderMenuItems({ menuItems: menuItemArray, includeEmpty, emptyLabel })
                : <MenuItem value={1} primaryText={noOptionsLabel || '-'} />
            }
        </SelectField>
    );
}
DropDown.propTypes = {
    defaultValue: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.bool,
    ]),
    value: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
        React.PropTypes.bool,
    ]),
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func.isRequired,
    menuItems: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object,
    ]),
    includeEmpty: React.PropTypes.bool,
    emptyLabel: React.PropTypes.string,
    noOptionsLabel: React.PropTypes.string,
};
DropDown.defaultProps = {
    includeEmpty: false,
    emptyLabel: '',
};

export default DropDown;
