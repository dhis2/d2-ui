import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import i18n from '@dhis2/d2-i18n';

class PeriodTypeButton extends Component {
    handleClick = () => {
        this.props.onClick(this.props.periodType);
    };

    render = () => (
        <Button
            className={`nav-button ${this.props.periodType === this.props.activePeriodType ? 'active' : ''}`}
            onClick={this.handleClick}
        >
            {i18n.t(this.props.text)}
        </Button>
    )
}

PeriodTypeButton.propTypes = {
    periodType: PropTypes.string.isRequired,
    activePeriodType: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default PeriodTypeButton;
