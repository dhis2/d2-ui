import React from 'react';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { styles } from '../styles/buttons.style';

export const ArrowButton = ({ className, onClick, iconType }) => (
    <div className={className}>
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
