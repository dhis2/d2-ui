import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import parsePeriod from 'd2/period/parser';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import periodTypeLookup from '../periodTypes/lookup';
import {
    DAY,
    WEEK,
    BI_WEEK,
    MONTH,
    BI_MONTH,
    QUARTER,
    SIX_MONTH,
    YEAR,
} from '../periodTypes/distinctTypes';
import checkForUnsupportedPeriodTypes from '../periodTypes/checkForUnsupportedPeriodTypes';
import Select from './Select';
import PeriodFields from './PeriodFields';

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

// Period types can be cached for the entire app lifecycle
// because they won't change
let periodTypes;

class PeriodPicker extends PureComponent {
    state = {
        ready: false,
        periodType: '',
        errorText: '',
        [DAY]: '',
        [WEEK]: '',
        [BI_WEEK]: '',
        [MONTH]: '',
        [BI_MONTH]: '',
        [QUARTER]: '',
        [SIX_MONTH]: '',
        [YEAR]: '',
    };
    api = this.props.d2.Api.getApi();

    onPeriodTypeChange = ({ target }) => {
        this.setState({ periodType: target.value, errorText: '' });
    };

    onPeriodFieldChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
        let errorText = this.state.errorText;
        const futureState = {
            ...this.state,
            [target.name]: target.value,
        };
        const periodType = periodTypeLookup.get(futureState.periodType);

        if (periodType.hasRequiredValues(futureState)) {
            errorText = periodType.getError(futureState);

            if (!errorText) {
                const periodId = periodType.getPeriodId(futureState);

                try {
                    const period = parsePeriod(periodId);
                    errorText = '';
                    this.props.onChange(period.id);
                } catch (error) {
                    errorText = error.message;
                }
            }
        }

        this.setState({
            [target.name]: target.value,
            errorText,
        });
    };

    getValueForPeriodFieldType = type => this.state[type];

    async componentDidMount() {
        if (!periodTypes) {
            await this.fetchPeriodTypes();
        }
        this.updateStateFromPeriodId();
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.updateStateFromPeriodId();
        }
    }

    async fetchPeriodTypes() {
        try {
            const response = await this.api.get('periodTypes');
            periodTypes = response.periodTypes.reduce((acc, { name }) => {
                const supportedPeriod = periodTypeLookup.get(name);
                if (supportedPeriod) {
                    acc[name] = supportedPeriod.label;
                }
                return acc;
            }, {});
            checkForUnsupportedPeriodTypes(response.periodTypes);
        } catch (error) {
            console.error(error);
            this.setState({
                errorText: i18n.t(
                    'There was a problem fetching the period types'
                ),
            });
        }
    }

    updateStateFromPeriodId() {
        const periodId = this.props.value;
        let periodType = '';
        let errorText = '';
        let updateObject = {};
        if (periodId) {
            try {
                const period = parsePeriod(periodId);
                periodType = period.type;
                updateObject = periodTypeLookup
                    .get(periodType)
                    .createPeriodFieldUpdater(period.id, period.startDate);
            } catch (error) {
                // This should only be triggered when an invalid value is set via props
                console.error(error);
                errorText = i18n.t('Invalid period detected');
            }
        }
        this.setState({ periodType, errorText, ready: true, ...updateObject });
    }

    render() {
        if (!periodTypes) {
            return <h1>Loading...</h1>;
        }

        return (
            <Fragment>
                <Select
                    name="periodType"
                    label={i18n.t('Period type')}
                    value={this.state.periodType}
                    onChange={this.onPeriodTypeChange}
                    options={periodTypes}
                />
                {this.state.periodType && (
                    <PeriodFields
                        periodType={this.state.periodType}
                        onChange={this.onPeriodFieldChange}
                        getValue={this.getValueForPeriodFieldType}
                    />
                )}
                {this.state.errorText && (
                    <FormHelperText
                        className={`${this.props.classes.error}  ${
                            this.props.classes.helper
                        }`}
                    >
                        {this.state.errorText}
                    </FormHelperText>
                )}
                {this.props.value &&
                    !this.state.errorText && (
                        <FormHelperText className={this.props.classes.helper}>
                            {parsePeriod(this.props.value).name}
                        </FormHelperText>
                    )}
            </Fragment>
        );
    }
}

PeriodPicker.propTypes = {
    d2: PropTypes.object.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PeriodPicker);
