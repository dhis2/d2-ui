import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

class PeriodTypeButton extends Component {
    constructor(props, context) {
        super(props);

        this.i18n = context.d2.i18n;
    }

    handleClick = () => {
        this.props.onClick(this.props.periodType);
    };

    render() {
        return (
            <Button
                className={`nav-button ${this.props.periodType === this.props.activePeriodType ? 'active' : ''}`}
                onClick={this.handleClick}
            >
                {this.i18n.getTranslation(this.props.text)}
            </Button>
        );
    }
}

PeriodTypeButton.propTypes = {
    periodType: PropTypes.string.isRequired,
    activePeriodType: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

PeriodTypeButton.contextTypes = {
    d2: PropTypes.object,
};

export default PeriodTypeButton;
