import React from 'react';

import { DatePicker } from 'material-ui';

class FutureDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.maxDate = new Date();
        this.props = props;
        this._onDateSelect = this._onDateSelect.bind(this);
        this._formatDate = this._formatDate.bind(this);
        this.state = {value: null};
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
        let mm = date.getMonth()+1;
        let yyyy = date.getFullYear();
        if(dd<10){
            dd='0'+dd
        } 
        if(mm<10){
            mm='0'+mm
        } 
        
        switch(this.props.dateFormat) {
            case "dd-MM-yyyy": return dd+'-'+mm+'-'+yyyy;
            case "yyyy-MM-dd": return yyyy+'-'+mm+'-'+dd;
            default: return dd+'-'+mm+'-'+yyyy;
        }
    }

    render() {
        return (
              <div>
                    <DatePicker
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
};

FutureDatePicker.contextTypes = {
    d2: React.PropTypes.object,
};

FutureDatePicker.propTypes = {
    floatingLabelText: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    dateFormat: React.PropTypes.string.isRequired,
};

export default FutureDatePicker;