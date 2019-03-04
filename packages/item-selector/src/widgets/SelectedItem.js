import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import ItemIcon from './ItemIcon';
import DeselectIconButton from './DeselectIconButton';
import { colors } from '../styles/colors';
import styles from './styles/SelectedItem.style';

const onClickWrapper = ({id, index, onClick}) => event =>
    onClick(event.metaKey || event.ctrlKey, event.shiftKey, index, id);

export const Item = ({ name, highlighted, ghost, onRemoveItem, ...rest }) => {
    return (
        <div
            className={cx('item', { 'highlighted-item': highlighted, ghost, 'selected-item': !highlighted })}
            onClick={onClickWrapper(rest)}
            data-test={`dimension-item-${rest.id}`}
        >
            <ItemIcon backgroundColor={highlighted ? colors.white : colors.accentSecondary} />
            <span className={cx('item-label', { 'highlighted-text': highlighted })}>
                {name}
            </span>
            <DeselectIconButton
                fill={highlighted ? colors.white : colors.accentSecondary}
                onClick={() => onRemoveItem(rest.id)}
            />
            <style jsx>{styles}</style>
        </div>
    );
};

Item.defualtProps = {
    onRemoveItem: () => null,
    onClick: () => null,
};

Item.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    highlighted: PropTypes.bool.isRequired,
    ghost: PropTypes.bool,
    onClick: PropTypes.func,
    onRemoveItem: PropTypes.func,
};

export default Item;
