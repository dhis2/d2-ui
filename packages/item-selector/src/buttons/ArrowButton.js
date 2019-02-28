import React from 'react';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { styles } from '../styles/buttons.style';

export const ArrowButton = ({ style, onClick, iconType }) => (
    <div style={style}>
        <button
            style={styles.arrowButton}
            onClick={onClick}
        >
            {iconType === 'arrowForward' ? (
                <ArrowForward style={styles.arrowIcon} />
            ) : (
                <ArrowBack style={styles.arrowIcon} />
            )}
        </button>
    </div>
);

export default ArrowButton;
