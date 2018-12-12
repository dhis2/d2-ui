import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Reply from '@material-ui/icons/Reply';
import Create from '@material-ui/icons/Create';
import Share from '@material-ui/icons/Share';
import Delete from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles/ActionButton.style';

/*
export const Icons = [
    { iconType: <ThumbUpIcon style={{...styles.interpretationCommentIcon, ...styles.likedInterpretationIcon}} />, tooltip: i18n.t('Like') },
    { iconType: <ThumbUpIcon style={styles.interpretationCommentIcon} />, tooltip: i18n.t('Unlike') },
	{ iconType: <Reply style={styles.interpretationCommentIcon} />, tooltip: i18n.t('Reply') },
    { iconType: <VisibilityOff style={styles.interpretationCommentIcon} />, tooltip: i18n.t('Exit View') },
    { iconType: <Share style={styles.interpretationCommentIcon} />, tooltip: i18n.t('Share') },
	{ iconType: <Create  style={styles.interpretationCommentIcon} />, tooltip: i18n.t('Edit') },
	{ iconType: <Delete style={styles.interpretationCommentIcon} />, tooltip: i18n.t('Delete') },
	{ iconType: <Visibility style={styles.interpretationCommentIcon}/>, tooltip: i18n.t('View') },
];

*/
const Icons = {
	visibility: <Visibility style={styles.interpretationCommentIcon}/>,
	visibilityOff: <VisibilityOff style={styles.interpretationCommentIcon} />,
    like: <ThumbUpIcon style={{...styles.interpretationCommentIcon, ...styles.likedInterpretationIcon}} />,
    unlike: <ThumbUpIcon style={styles.interpretationCommentIcon} />,
	reply: <Reply style={styles.interpretationCommentIcon} />,
	edit: <Create  style={styles.interpretationCommentIcon} />,
	share: <Share style={styles.interpretationCommentIcon} />,
	delete: <Delete style={styles.interpretationCommentIcon} />,
}

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

ActionButton.propTypes = {
	classes: PropTypes.object.isRequired,
	iconType: PropTypes.string.isRequired,
	tooltip: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(ActionButton);
