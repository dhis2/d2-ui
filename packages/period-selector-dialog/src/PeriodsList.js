import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import StopIcon from '@material-ui/icons/Stop'

class PeriodsList extends Component {
    render() {
        const { periods, onPeriodClick } = this.props;

        return <List component="nav" className="periods-list">
            {periods.map((period, index) => {
                return <ListItem onClick={(event) => onPeriodClick(period, index, event.shiftKey)}
                                 className={"period-li " + (period.selected === true ? 'selected' : '')}
                                 key={period.id}
                                 button
                >
                    <ListItemText>
                        <StopIcon className="list-icon"/>
                        <span className="list-text">{period.name}</span>
                    </ListItemText>
                </ListItem>
            })}
        </List>
    }
}

PeriodsList.propTypes = {
    periods: PropTypes.array.isRequired,
    onPeriodClick: PropTypes.func,
};

export default PeriodsList;
