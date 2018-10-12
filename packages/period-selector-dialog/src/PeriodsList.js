import React from 'react';
import PropTypes from 'prop-types';
import PeriodListItem from './PeriodListItem';

const PeriodsList = props => (
    <ul
        className={props.listName}
    >
        {props.periods.map((period, index) =>
            (<PeriodListItem
                onPeriodClick={props.onPeriodClick}
                period={period}
                index={index}
                key={period.id}
                listName={props.listName}
            />),
        )}
    </ul>
);

PeriodsList.propTypes = {
    periods: PropTypes.array.isRequired,
    listName: PropTypes.string.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
};

PeriodsList.contextTypes = {
    listHeight: PropTypes.number,
};

export default PeriodsList;
