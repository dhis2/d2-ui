import React from 'react';
import PropTypes from 'prop-types';

import { DatePicker as MuiDatePicker } from 'material-ui';

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        const {
            allowFuture,
            dateFormat,
            ...other
        } = props;
        this.other = other;

        this.maxDate = allowFuture ? undefined : new Date();
        this.onDateSelect = this.onDateSelect.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.state = { value: this.props.value };
    }

    onDateSelect(event, date) {
        this.setState({ value: date });
        this.props.onChange({
            target: {
                value: date,
            },
        });
    }

    formatDate(date) {
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        const yyyy = date.getFullYear();
        if (dd < 10) {
            dd = `0${dd}`;
        }
        if (mm < 10) {
            mm = `0${mm}`;
        }

        switch (this.dateFormat) {
        case 'dd-MM-yyyy': return `${dd}-${mm}-${yyyy}`;
        case 'yyyy-MM-dd': return `${yyyy}-${mm}-${dd}`;
        default: return `${dd}-${mm}-${yyyy}`;
        }
    }

    render() {
        return (
            <div>
                <MuiDatePicker
                    {...this.other}
                    value={this.state.value}
                    floatingLabelText={this.props.floatingLabelText}
                    maxDate={this.maxDate}
                    errorText={this.props.errorText}
                    formatDate={this.formatDate}
                    onChange={this.onDateSelect}
                />
            </div>
        );
    }
}

DatePicker.propTypes = {
    floatingLabelText: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    dateFormat: PropTypes.string.isRequired,
    allowFuture: PropTypes.bool.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
};

DatePicker.defaultProps = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
};

export default DatePicker;
