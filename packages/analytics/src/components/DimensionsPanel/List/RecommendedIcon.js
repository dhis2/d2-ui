import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import i18n from '@dhis2/d2-i18n';
import { styles } from './styles/RecommendedIcon.style';

export class RecommendedIcon extends Component {
    state = { anchorEl: null };

    onMouseOver = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    onMouseExit = () => {
        this.setState({ anchorEl: null });
    };

    showTooltip = () => (
        <Popper
            anchorEl={this.state.anchorEl}
            open={Boolean(this.state.anchorEl)}
            placement="bottom"
        >
            <Paper style={styles.toolTip}>
                {i18n.t('Dimension recommended with selected data')}
            </Paper>
        </Popper>
    );

    render() {
        const TooltipOnHover = Boolean(this.state.anchorEl)
            ? this.showTooltip()
            : null;

        return this.props.isRecommended ? (
            <div style={styles.recommendedWrapper}>
                <div
                    style={styles.recommendedIcon}
                    onMouseOver={this.onMouseOver}
                    onMouseLeave={this.onMouseExit}
                >
                    {TooltipOnHover}
                </div>
            </div>
        ) : null;
    }
}

RecommendedIcon.propTypes = {
    id: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    isRecommended: PropTypes.bool.isRequired,
};

export default RecommendedIcon;
