import React from 'react';

import { DatePicker as MuiDatePicker } from 'material-ui';

class DatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.maxDate = props.allowFuture ? undefined : new Date();
        this.props = props;
        this._onDateSelect = this._onDateSelect.bind(this);
        this._formatDate = this._formatDate.bind(this);
        this.state = { value: this.props.value };
    }

    _onDateSelect(event, date) {
        this.setState({ value: date });
        this.props.onChange({
            target: {
                value: date,
            },
        });
    }

    _formatDate(date) {
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        const yyyy = date.getFullYear();
        if (dd < 10) {
            dd = `0${dd}`;
        }
        if (mm < 10) {
            mm = `0${mm}`;
        }

        switch (this.props.dateFormat) {
        case 'dd-MM-yyyy': return `${dd}-${mm}-${yyyy}`;
        case 'yyyy-MM-dd': return `${yyyy}-${mm}-${dd}`;
        default: return `${dd}-${mm}-${yyyy}`;
        }
    }

    render() {
        return (
            <div>
                <MuiDatePicker
                    {...this.props}
                    value={this.state.value}
                    floatingLabelText={this.props.floatingLabelText}
                    maxDate={this.maxDate}
                    formatDate={this._formatDate}
                    onChange={this._onDateSelect}
                />
            </div>
        );
    }
}

DatePicker.propTypes = {
    floatingLabelText: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    dateFormat: React.PropTypes.string.isRequired,
    allowFuture: React.PropTypes.bool.isRequired,
};

export default DatePicker;
