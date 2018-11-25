import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';


export const PeriodTypeButton = ({ periodType, activePeriodType, text, onClick }) => (
    <Button
        className={`nav-button ${periodType === activePeriodType ? 'active' : ''}`}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={() => onClick(periodType)}
    >
        {text}
    </Button>
);

PeriodTypeButton.propTypes = {
    periodType: PropTypes.string.isRequired,
    activePeriodType: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default PeriodTypeButton;
