import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import MUISelect from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        width: '100%',
    },
});

export const Select = ({ name, label, value, onChange, options, classes }) => (
    <FormControl className={classes.formControl}>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <MUISelect
            value={value}
            onChange={onChange}
            autoWidth={true}
            inputProps={{
                name,
                id: name,
            }}
        >
            {Object.keys(options).map(key => (
                <MenuItem key={key} value={key}>
                    {options[key]}
                </MenuItem>
            ))}
        </MUISelect>
    </FormControl>
);

Select.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Select);
