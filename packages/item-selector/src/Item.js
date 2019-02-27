import React from 'react';
import PropTypes from 'prop-types';
import { colors } from './colors';
import RemoveDimensionButton from './buttons/RemoveDimensionButton';
import ItemIcon from './ItemIcon';
import { styles } from './styles/Item.style';

const Icon = ({ selected, highlighted }) => {
    const { grey, white, accentSecondary } = colors;
    const bgColor = !selected ? grey : highlighted ? white : accentSecondary;

    return <ItemIcon backgroundColor={bgColor} />;
};

const onClickWrapper = (id, index, onClick) => event =>
    onClick(event.metaKey || event.ctrlKey, event.shiftKey, index, id);

export const Item = ({
    selected,
    highlighted,
    id,
    index,
    onRemoveItem,
    onClick,
    name,
    isGhost,
}) => {
    const selectedState = selected ? 'selected' : 'unselected';
    // const divClassName = [`${selectedState}-list-item`]
    //     .concat(isGhost ? 'ghost' : '')
    //     .join(' ');

    //
    const highlightedStyle = highlighted ? styles.highlightedItem : {};
    const itemStyle = selected ? Object.assign({}, styles.selectedItem, styles.item) : styles.item;
    const ghostStyle = isGhost ? styles.ghost : {};
    const divStyle = Object.assign({}, itemStyle, ghostStyle, highlightedStyle);

    const highlightedSpanStyle = highlighted ? styles.highlightedText : {};
    const labelStyle = selected ? styles.selectedItemLabel : styles.unselectedItemLabel;
    const spanStyle = Object.assign({}, labelStyle, highlightedSpanStyle);


    return (
        <div
            data-test={`dimension-item-${id}`}
            style={divStyle}
            onClick={onClickWrapper(id, index, onClick)}
        >
            <Icon selected={selected} highlighted={highlighted} />
            <span style={spanStyle}>{name}</span>
            {selected && (
                <RemoveDimensionButton
                    highlighted={highlighted}
                    onClick={() => onRemoveItem(id)}
                />
            )}
        </div>
    );
};

Item.defualtProps = {
    onRemoveItem: () => null,
    onClick: () => null,
};

Item.propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    highlighted: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    onRemoveItem: PropTypes.func,
    selected: PropTypes.bool,
    isGhost: PropTypes.bool,
};

export default Item;
