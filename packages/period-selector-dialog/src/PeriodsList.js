import React from 'react';
import PropTypes from 'prop-types';
import PeriodListItem from './PeriodListItem';

const PeriodsList = (props) => {
    const { items, ...remaindingProps } = props;

    const ListItems = items.map((period, index) => (
        <PeriodListItem
            period={period}
            index={index}
            key={period.id}
            {...remaindingProps}
        />
    ));

    return <ul className={remaindingProps.listClassName}>{ListItems}</ul>;
};

PeriodsList.propTypes = {
    items: PropTypes.array.isRequired,
    onPeriodClick: PropTypes.func.isRequired,
    onPeriodDoubleClick: PropTypes.func,
    onRemovePeriodClick: PropTypes.func,
    listClassName: PropTypes.string.isRequired,
};

PeriodsList.defaultProps = {
    onPeriodDoubleClick: () => null,
    onRemovePeriodClick: () => null,
};

export default PeriodsList;
