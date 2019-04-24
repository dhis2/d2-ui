import i18n from '@dhis2/d2-i18n';
import { withStyles } from '@material-ui/core/styles';
import parsePeriod from 'd2/period/parser';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import checkForUnsupportedPeriodTypes from '../periodTypes/checkForUnsupportedPeriodTypes';
import {
    BI_MONTH,
    BI_WEEK,
    DAY,
    MONTH,
    QUARTER,
    SIX_MONTH,
    WEEK,
    YEAR,
} from '../periodTypes/distinctTypes';
import periodTypeLookup from '../periodTypes/lookup';
import Form from './Form';
import Loader from './Loader';

export const PERIOD_TYPES_ENDPOINT = 'periodTypes';

const styles = theme => {
    return {
        label: {
            fontSize: '1.2rem',
            fontWeight: '300',
            color: 'rgba(0, 0, 0, 0.87)',
            padding: '16px 8px 0px',
            margin: '0px',
            flex: '1 0 120px',
        },
    };
};

// Period types can be cached for the entire app lifecycle
// because they won't change
export let periodTypes;

export class PeriodPicker extends PureComponent {
    state = {
        isLoading: true,
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

    onChange = ({ target }) => {
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
                    // All is well: proceed
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
            try {
                await this.fetchPeriodTypes();
                this.updateStateFromPeriodId();
            } catch (error) {
                console.error(error);
                const errorText = i18n.t('Could not load period types');
                this.setState({ errorText, isLoading: false });
            }
        } else {
            this.updateStateFromPeriodId();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.updateStateFromPeriodId();
        }
    }

    async fetchPeriodTypes() {
        const response = await this.api.get(PERIOD_TYPES_ENDPOINT);
        periodTypes = response.periodTypes.reduce((acc, { name }) => {
            const supportedPeriod = periodTypeLookup.get(name);
            if (supportedPeriod) {
                acc[name] = supportedPeriod.label;
            }
            return acc;
        }, {});
        checkForUnsupportedPeriodTypes(response.periodTypes);
    }

    updateStateFromPeriodId() {
        const periodId = this.props.value;
        let periodType = this.state.periodType;
        let errorText = this.state.errorText;
        let periodFieldsUpdateObject = {};

        if (periodId) {
            try {
                const period = parsePeriod(periodId);
                periodType = period.type;
                periodFieldsUpdateObject = periodTypeLookup
                    .get(periodType)
                    .createPeriodFieldUpdater(period.id, period.startDate);
            } catch (error) {
                // This should only be triggered when an invalid value is set via props
                console.error(error);
                errorText = error.message;
            }
        }
        this.setState({
            periodType,
            errorText,
            isLoading: false,
            ...periodFieldsUpdateObject,
        });
    }

    renderFormFields() {
        return;
    }

    render() {
        return (
            <Fragment>
                {this.props.label && (
                    <h4 className={this.props.classes.label}>
                        {this.props.label}
                    </h4>
                )}
                {this.state.isLoading ? (
                    <Loader />
                ) : (
                    <Form
                        periodTypes={periodTypes}
                        periodType={this.state.periodType}
                        onChange={this.onChange}
                        getFieldValue={this.getValueForPeriodFieldType}
                        errorText={this.state.errorText}
                        value={this.props.value}
                    />
                )}
            </Fragment>
        );
    }
}

PeriodPicker.propTypes = {
    d2: PropTypes.object.isRequired,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
};

PeriodPicker.defaultProps = {
    label: '',
    value: '',
};

export default withStyles(styles)(PeriodPicker);
