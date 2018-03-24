import React from 'react';

class SelectedPeriods extends React.Component {
    render() {
        const periods = Object.keys(this.props.periods).map(key => (
            <li
                key={key}
                onClick={this.props.removeSelectedPeriod}
            >
                {this.props.periods[key].name}
            </li>
        ));

        return <ul>{periods}</ul>;
    }
}

export default SelectedPeriods;
