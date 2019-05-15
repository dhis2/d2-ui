import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import MUISelect from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { YEAR } from '../models/distinctTypes';
import { SHIFT_YEARS_BACK, SHIFT_YEARS_FORTH } from './PeriodPicker';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        width: '100%',
    },
    eventLess: {
        pointerEvents: 'none',
    },
});

export const Select = ({
    name,
    label,
    value,
    onChange,
    options,
    classes,
    yearFieldOpen,
    onYearOpen,
    onYearClose,
}) => {
    const isYearField = name === YEAR;
    const yearFieldProps = isYearField
        ? {
              open: yearFieldOpen,
              onOpen: onYearOpen,
              onClose: onYearClose, // just keep it open
          }
        : {};

    return (
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
                disabled={options.length === 0}
                {...yearFieldProps}
            >
                {isYearField && (
                    <MenuItem key={SHIFT_YEARS_BACK} value={SHIFT_YEARS_BACK}>
                        <ArrowUpIcon className={classes.eventLess} />
                    </MenuItem>
                )}
                {options.map(({ value, label, id }) => (
                    <MenuItem key={value} value={value} period-id={id}>
                        {label}
                    </MenuItem>
                ))}
                {isYearField && (
                    <MenuItem key={SHIFT_YEARS_FORTH} value={SHIFT_YEARS_FORTH}>
                        <ArrowDownIcon className={classes.eventLess} />
                    </MenuItem>
                )}
            </MUISelect>
        </FormControl>
    );
};

Select.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    yearFieldOpen: PropTypes.bool,
    onYearOpen: PropTypes.func,
    onYearClose: PropTypes.func,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Select);
