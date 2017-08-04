import PropTypes from 'prop-types';
import React from 'react';

export default function ListSelect(props) {
    function listItemDoubleClicked(event) {
        const clickedItemValue = event.target.value;

        if (props.onItemDoubleClick) {
            props.onItemDoubleClick(clickedItemValue);
        }
    }

    const options = props.source.map(item => (
        <option
            key={item.value}
            style={{ padding: '.25rem' }}
            onDoubleClick={listItemDoubleClicked}
            value={item.value}
        >
            {item.label}
        </option>
    ));

    return (
        <div className="list-select">
            <select size={props.size || 15} style={Object.assign({overflowX: 'auto'}, props.listStyle)}>
                {options}
            </select>
        </div>
    );
}
ListSelect.propTypes = {
    source: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
    })).isRequired,
    onItemDoubleClick: PropTypes.func.isRequired,
    listStyle: PropTypes.object,
    size: PropTypes.number,
};
