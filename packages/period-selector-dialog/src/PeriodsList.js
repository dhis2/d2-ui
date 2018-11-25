import React from 'react';
import PropTypes from 'prop-types';
import PeriodListItem from './PeriodListItem';

const PeriodsList = (props) => {
    const { items, ...remaindingProps } = props;

    const ListItems = items.map((period, index) => (
        <PeriodListItem
            className={remaindingProps.className}
            period={period}
            index={index}
            key={period.id}
            {...remaindingProps}
        />
    ));

    return <ul className={remaindingProps.className}>{ListItems}</ul>;
};

PeriodsList.propTypes = {
    items: PropTypes.array.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
    onPeriodDoubleClick: PropTypes.func,
    onRemovePeriodClick: PropTypes.func,
};

PeriodsList.defaultProps = {
    onPeriodDoubleClick: () => null,
    onRemovePeriodClick: () => null,
};

export default PeriodsList;
