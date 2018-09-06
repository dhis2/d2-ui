import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import PeriodListItem from './PeriodListItem';


const PeriodsList = props => (
    <List component="nav" className="periods-list">
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

export default PeriodsList;
