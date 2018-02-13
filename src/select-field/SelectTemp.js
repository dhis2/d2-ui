import React, { createClass } from 'react';
import PropTypes from 'prop-types';
import Select from 'material-ui-next/Select';
import { MenuItem, MenuList } from 'material-ui-next/Menu';
import { createClassName } from '../component-helpers/utils';


const SelectTemp = props => {
    const { autoWidth, children, classes, displayEmpty, input, /*items,*/ inputProps, loading, MenuProps, 
        multiple, native, onChange, onClose, onOpen, open, renderValue, value, selector, style,
    } = props;
    
    const className = createClassName('d2-ui-selectfield', selector);
    console.log(children);
    //console.log(items); 
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
        />
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