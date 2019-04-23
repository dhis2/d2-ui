import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import parsePeriod from 'd2/period/parser';
import PeriodFields from './PeriodFields';
import Select from './Select';

const styles = theme => {
    return {
        error: {
            color: theme.colors.negative,
        },
        helper: {
            margin: 8,
        },
    };
};

const Form = ({
    periodTypes,
    periodType,
    onPeriodTypeChange,
    onPeriodFieldChange,
    getFieldValue,
    errorText,
    value,
    classes,
}) => (
    <Fragment>
        {periodTypes && (
            <Select
                name="periodType"
                label={i18n.t('Period type')}
                value={periodType}
                onChange={onPeriodTypeChange}
                options={periodTypes}
            />
        )}
        {periodType && (
            <PeriodFields
                periodType={periodType}
                onChange={onPeriodFieldChange}
                getValue={getFieldValue}
            />
        )}
        {errorText && (
            <FormHelperText className={`${classes.error} ${classes.helper}`}>
                {errorText}
            </FormHelperText>
        )}
        {value &&
            !errorText && (
                <FormHelperText className={classes.helper}>
                    {parsePeriod(value).name}
                </FormHelperText>
            )}
    </Fragment>
);

Form.propTypes = {
    periodTypes: PropTypes.object.isRequired,
    periodType: PropTypes.string.isRequired,
    onPeriodTypeChange: PropTypes.func.isRequired,
    onPeriodFieldChange: PropTypes.func.isRequired,
    getFieldValue: PropTypes.func.isRequired,
    errorText: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);
