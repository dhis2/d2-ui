import React, { createClass } from 'react';
import PropTypes from 'prop-types';
import Select from 'material-ui-next/Select';
import Input, { InputLabel } from 'material-ui-next/Input';
import { MenuItem, MenuList } from 'material-ui-next/Menu';

import { createClassName } from '../component-helpers/utils';

const getMenuItems = items => {
    if (!Array.isArray(items)) {
        return null;
    }
    console.log(items);
    return (
        <MenuList>
            {items.map(items => {
                <MenuItem> {items.name} </MenuItem>
            })}
        </MenuList>
        );
};

const SelectTemp = props => {
    const { autoWidth, children, classes, displayEmpty, input, inputProps, MenuProps, 
        multiple, native, onChange, onClose, onOpen, open, renderValue, value, selector
    } = props;
    
    const className = createClassName('d2-ui-selectfield', selector);
    
    return (
        <Select
            autoWidth={autoWidth}
            children={children}
            classes={classes}
            displayEmpty={displayEmpty}
            input={input}
            inputProps={inputProps}
            MenuProps={MenuProps}
            multiple={multiple}
            native={native}
            onChange={onChange}
            onClose={onClose}
            onOpen={onOpen}
            open={open}
            renderValue={renderValue}
            value={value}
        >
            {getMenuItems(children)}
        </Select>
    );
}

SelectTemp.PropTypes = {
    autoWidth: PropTypes.bool,
    children: PropTypes.node,
    classes: PropTypes.object,
    displayEmpty: PropTypes.bool,
    input: PropTypes.element,
    inputProps: PropTypes.object,
    MenuProps: PropTypes.object,
    multiple: PropTypes.bool,
    native: PropTypes.bool,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    open: PropTypes.bool,
    renderValue: PropTypes.func,
    value: PropTypes.value,
};

SelectTemp.defaultProps = {

};

export default SelectTemp;