import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import StopIcon from '@material-ui/icons/Stop';

class PeriodListItem extends Component {
    onPeriodClick = (event) => {
        this.props.onPeriodClick(this.props.period, this.props.index, event.shiftKey, event.metaKey);
    };

    render() {
        return (
            <ListItem
                onClick={this.onPeriodClick}
                className={`period-li ${this.props.period.selected === true ? 'selected' : ''}`}
                key={this.props.period.id}
                button
            >
                <ListItemText>
                    <StopIcon className="list-icon" />
                    <span className="list-text">{this.props.period.name}</span>
                </ListItemText>
            </ListItem>
        );
    }
}

PeriodListItem.propTypes = {
    index: PropTypes.number.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
    period: PropTypes.object.isRequired,
};

export default PeriodListItem;
