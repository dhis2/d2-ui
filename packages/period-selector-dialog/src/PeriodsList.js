import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import PeriodListItem from './PeriodListItem';

const PeriodsList = (props, context) => (
    <List
        component="nav"
        className="periods-list"
        style={{ height: context.listHeight }}
    >
        {props.periods.map((period, index) =>
            (<PeriodListItem
                onPeriodClick={props.onPeriodClick}
                period={period}
                index={index}
                key={period.id}
            />),
        )}
    </List>
);

PeriodsList.propTypes = {
    periods: PropTypes.array.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
};

PeriodsList.contextTypes = {
    listHeight: PropTypes.number,
};

export default PeriodsList;
