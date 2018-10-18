import React from 'react';
import PropTypes from 'prop-types';
import PeriodListItem from './PeriodListItem';

const PeriodsList = (props) => {
    const { periods, ...remaindingProps } = props;
    return (<ul
        className={remaindingProps.listClassName}
    >
        {props.periods.map((period, index) =>
            (<PeriodListItem
                period={period}
                index={index}
                key={period.id}
                {...remaindingProps}
            />),
        )}
    </ul>
    );
};

PeriodsList.propTypes = {
    periods: PropTypes.array.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
    onDoubleClick: PropTypes.func,
    onRemovePeriodClick: PropTypes.func,
    listClassName: PropTypes.string.isRequired,
};

PeriodsList.defaultProps = {
    onDoubleClick: () => null,
    onRemovePeriodClick: () => null,
};

export default PeriodsList;
