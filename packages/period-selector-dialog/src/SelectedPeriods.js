import React from 'react';
import { List, ListItem, ListItemText } from 'material-ui-next';

class SelectedPeriods extends React.Component {
    render() {
        return <div className="selector-area">
            <h4 className="title">Selected periods</h4>
            <List component="nav" className="periods-list">
                {this.props.periods.map((period, index) => {
                    return <ListItem onClick={(event) => this.props.onPeriodClick(period, index, event.shiftKey)}
                                     className={"period-li " + (period.selected === true ? 'selected' : '')}
                                     key={period.id}
                                     button
                    >
                        <ListItemText>
                            <i className="material-icons list-icon">stop</i>
                            <span className="list-text">{period.name}</span>
                        </ListItemText>
                    </ListItem>
                })}
            </List>
        </div>
    }
}

export default SelectedPeriods;
