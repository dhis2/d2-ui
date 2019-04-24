import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import periodTypeLookup from '../periodTypes/lookup';
import Select from './Select';

const styles = theme => ({
    flexContainer: {
        display: 'flex',
        marginRight: -16,
    },
});

export const PeriodFields = ({ periodType, onChange, getValue, classes }) => {
    const periodFields = periodTypeLookup.get(periodType).getPeriodFields();

    return (
        <div className={classes.flexContainer}>
            {Object.keys(periodFields).map(key => (
                <Select
                    key={periodFields[key].name}
                    name={periodFields[key].name}
                    label={periodFields[key].label}
                    value={getValue(periodFields[key].name)}
                    onChange={onChange}
                    options={periodFields[key].options}
                />
            ))}
        </div>
    );
};

PeriodFields.propTypes = {
    periodType: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PeriodFields);
