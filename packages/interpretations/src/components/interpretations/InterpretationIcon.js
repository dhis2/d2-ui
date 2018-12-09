import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import { Icons } from './misc';
import styles from './styles/InterpretationIcon.style';

export class InterpretationIcon extends Component {
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
				{this.props.tooltip}
			</Paper>
		</Popper>
	);

    render() {
        const Icon = Icons[this.props.iconType];
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

InterpretationIcon.propTypes = {
	classes: PropTypes.object.isRequired,
	iconType: PropTypes.string.isRequired,
	tooltip: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(InterpretationIcon);