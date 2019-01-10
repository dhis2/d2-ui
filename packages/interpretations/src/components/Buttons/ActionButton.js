import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Icons from './Icons';
import styles from './styles/ActionButton.style';

const TOOLTIP_ENTER_DELAY = 200;
export class ActionButton extends Component {

    state = { tooltipIsOpen: false }

	id = Math.random().toString(36);

	timeout = null;

    showTooltip = () => { 
		if(this.timeout === null) {
			this.timeout = setTimeout(
				() => this.setState({ tooltipIsOpen: true }),
				TOOLTIP_ENTER_DELAY
			);
		}

	};

    hideTooltip = () => {
		if (typeof this.timeout === 'number') {
			clearTimeout(this.timeout);
			this.timeout = null;
			this.setState({ tooltipIsOpen: false });
		}
	};

    renderTooltip = () => (
		<Popper
			anchorEl={document.getElementById(this.id)}
			open={this.state.tooltipIsOpen}
			placement="top"
		>
			<Paper className={this.props.classes.tooltip}>
				{this.props.tooltip || Icons[this.props.iconType].tooltip}
			</Paper>
		</Popper>
	);

    render() {
		const Icon = Icons[this.props.iconType].icon;
        const Tooltip =  this.renderTooltip();

        return (
			<div 
				id={this.id}
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
