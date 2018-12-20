import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { Icons } from './ButtonIcons';
import styles from './styles/ActionButton.style';

export class ActionButton extends Component {
    state = { anchorEl: null }

    showTooltip = event => this.setState({ anchorEl: event.currentTarget });

    hideTooltip = () => this.setState({ anchorEl: null });

    renderTooltip = () => (
		<Popper
			anchorEl={this.state.anchorEl}
			open={Boolean(this.state.anchorEl)}
			placement="top"
		>
			<Paper className={this.props.classes.tooltip}>
				{Icons[this.props.iconType].tooltip}
			</Paper>
		</Popper>
	);

    render() {
		const Icon = Icons[this.props.iconType].icon;
        const Tooltip =  this.renderTooltip();

        return (
			<div 
				className={this.props.classes.iconContainer}
				onMouseEnter={this.showTooltip} 
				onMouseLeave={this.hideTooltip} 
				onClick={this.props.onClick} 
			>
                {Icon}
                {Tooltip}
            </div>
        );
    }; 
};

ActionButton.propTypes = {
	classes: PropTypes.object.isRequired,
	iconType: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(ActionButton);
