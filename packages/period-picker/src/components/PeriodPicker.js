import i18n from '@dhis2/d2-i18n';
import { withStyles } from '@material-ui/core/styles';
import parsePeriod from 'd2/period/parser';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { checkForUnsupportedPeriodTypes } from '../models/helpers';
import {
    BI_MONTH,
    BI_WEEK,
    DAY,
    MONTH,
    QUARTER,
    SIX_MONTH,
    WEEK,
    YEAR,
} from '../models/distinctTypes';
import PeriodTypes from '../models/PeriodTypes';
import Select from './Select';

export const SHIFT_YEARS_BACK = 'SHIFT_YEARS_BACK';
export const SHIFT_YEARS_FORTH = 'SHIFT_YEARS_FORTH';

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
        flexContainer: {
            display: 'flex',
            marginRight: -16,
        },
    };
};

export class PeriodPicker extends PureComponent {
    constructor(props) {
        super(props);

        const locale = props.d2.currentUser.userSettings.get('keyUiLocale');
        const pt = new PeriodTypes(locale);

        this.periodTypeOptions = pt.getPeriodTypes();
        this.getPeriodType = pt.getPeriodType.bind(pt);
        this.getFields = pt.getFields.bind(pt);
        this.getFieldUpdateObject = pt.getFieldUpdateObject.bind(pt);
        this.findActivePeriodId = pt.findActivePeriodId.bind(pt);

        this.state = {
            periodType: '',
            errorText: '',
            yearFieldOpen: false,
            yearOffset: 0,
            [DAY]: '',
            [WEEK]: '',
            [BI_WEEK]: '',
            [MONTH]: '',
            [BI_MONTH]: '',
            [QUARTER]: '',
            [SIX_MONTH]: '',
            [YEAR]: '',
        };
    }

    onChange = ({ target }, component) => {
        if (
            target.value === SHIFT_YEARS_BACK ||
            target.value === SHIFT_YEARS_FORTH
        ) {
            this.shiftYears(target.value);
            return;
        }

        const state = {
            ...this.state,
            [target.name]: target.value,
        };
        const periodId =
            component.props['period-id'] ||
            this.findActivePeriodId(state, target.name);

        if (periodId) {
            this.props.onChange(periodId);
        } else {
            this.setState({
                [target.name]: target.value,
                yearFieldOpen: false,
            });
        }
    };

    openYearField = () => {
        this.setState({ yearFieldOpen: true });
    };

    componentDidMount() {
        // This only does something in development
        checkForUnsupportedPeriodTypes(this.props.d2, this.getPeriodType);
        this.updateStateFromPeriodId();
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.updateStateFromPeriodId();
        }
    }

    shiftYears(value) {
        const relativeOffset = value === SHIFT_YEARS_BACK ? -1 : 1;
        this.setState({ yearOffset: this.state.yearOffset + relativeOffset });
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
                errorText = '';
                periodFieldsUpdateObject = this.getFieldUpdateObject(period);
            } catch (error) {
                // This should only be triggered when an invalid value is set via props
                console.error(error);
                errorText = error.message;
            }
        }
        this.setState({
            periodType,
            errorText,
            yearFieldOpen: false,
            ...periodFieldsUpdateObject,
        });
    }

    render() {
        const fields = this.getFields(this.state);

        return (
            <Fragment>
                {this.props.label && (
                    <h4 className={this.props.classes.label}>
                        {this.props.label}
                    </h4>
                )}

                <Select
                    name="periodType"
                    label={i18n.t('Period type')}
                    value={this.state.periodType}
                    onChange={this.onChange}
                    options={this.periodTypeOptions}
                />

                {this.state.periodType && (
                    <div className={this.props.classes.flexContainer}>
                        {Object.keys(fields).map(key => (
                            <Select
                                key={fields[key].name}
                                name={fields[key].name}
                                label={fields[key].label}
                                value={this.state[fields[key].name]}
                                onChange={this.onChange}
                                options={fields[key].options}
                                yearFieldOpen={this.state.yearFieldOpen}
                                onYearOpen={this.openYearField}
                            />
                        ))}
                    </div>
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
