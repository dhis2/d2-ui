import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Select from './Select';

const styles = theme => ({
    flexContainer: {
        display: 'flex',
        marginRight: -16,
    },
});

const PeriodFields = ({ periodFields, onChange, getValue, classes }) => (
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

PeriodFields.propTypes = {
    periodFields: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PeriodFields);
