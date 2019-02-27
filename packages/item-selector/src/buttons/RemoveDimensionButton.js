import React from 'react';
import PropTypes from 'prop-types';
import Close from '@material-ui/icons/Close';
import { styles } from '../styles/buttons.style';

export const RemoveDimensionButton = ({ highlighted, onClick }) => (
    <button
        style={styles.deleteButton}
        onClick={e => {
            e.stopPropagation();
            onClick();
        }}
    >
        <Close style={highlighted ? styles.highlightedClose : styles.close} />
    </button>
);

RemoveDimensionButton.propTypes = {
    highlighted: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default RemoveDimensionButton;
