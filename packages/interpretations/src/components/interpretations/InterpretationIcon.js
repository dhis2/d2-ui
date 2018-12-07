import React, { Component } from 'react';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';

import { Icons } from './misc';
import styles from './InterpretationsStyles';

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
			<Paper style={styles.tooltip}>
				{this.props.tooltip}
			</Paper>
		</Popper>
	);

    render() {
        const Icon = Icons[this.props.iconType];
        const Tooltip =  this.renderTooltip();

        return (
			<div 
				style={styles.iconContainer}
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

export default InterpretationIcon;