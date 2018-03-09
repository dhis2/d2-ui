import React from 'react';
import PropTypes from 'prop-types';
import isString from 'lodash/fp/isString';
import Select from 'material-ui-next/Select';
import { InputLabel } from 'material-ui-next/Input';
import { FormControl } from 'material-ui-next/Form';
import { CircularProgress } from 'material-ui-next/Progress';
import { createClassName } from '../component-helpers/utils';


const d2DefaultStyle = {
    // separate style fyle with "d2-ui" standardized style to inject as Props (?)
    loadingIndicator: {
        teaxtAlign: 'center',
    },
    formControl: {
        minWidth: 200,
    },
};

const displayLoadingIndicator = (loading) => {
    let node;
    if (isString(loading)) node = <div>{loading}</div>;
    else node = <CircularProgress size={30} style={d2DefaultStyle.loadingIndicator} />;

    return node;
};

const SelectTemp = (props) => {
    const { children, error, inputLabelText, loading, selector, ...passThroughProps } = props;

    const className = createClassName('d2-ui-selectfield', selector);

    return (
        <FormControl
            style={d2DefaultStyle.formControl}
            error={error}
            // ...formcontrolprops / some HOC solution, or specify each prop (when wrapping multiple components like the new Select)? 
        >
            <InputLabel>{inputLabelText}</InputLabel>
            <Select
                {...passThroughProps}
            >
                { !loading || children
                    ? children
                    : displayLoadingIndicator(loading) }
            </Select>
        </FormControl>
    );
};

SelectTemp.propTypes = {
    autoWidth: PropTypes.bool,
    error: PropTypes.bool,
    children: PropTypes.node,
    classes: PropTypes.object,
    displayEmpty: PropTypes.bool,
    loading: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
    ]),
    input: PropTypes.element,
    inputLabelText: PropTypes.string,
    inputProps: PropTypes.object,
    MenuProps: PropTypes.object,
    multiple: PropTypes.bool,
    native: PropTypes.bool,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    open: PropTypes.bool,
    renderValue: PropTypes.func,
    selector: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ])),
    ]),
};

SelectTemp.defaultProps = {
};

export default SelectTemp;
