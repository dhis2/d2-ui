import React, { Fragment, Component } from 'react';
import i18n from '@dhis2/d2-i18n';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/LikesAndReplies.style';


export class LikesAndReplies extends Component {
    state = { mouseOverLikes: null, mouseOverReplies: null  }

    showLikedByTooltip = event => this.setState({ mouseOverLikes: event.currentTarget, });

    hideLikedByTooltip = () => this.setState({ mouseOverLikes: null });

    showRepliedByTooltip = event => this.setState({ mouseOverReplies: event.currentTarget });

    hideRepliedByTooltip = () => this.setState({ mouseOverReplies: null });

    filterDuplicateUserNames = label => {
        let listItems = [];

        this.props[label].forEach(userName => {
            if (!listItems.includes(userName)) {
                listItems = [...listItems, userName];
            }
        })
        return listItems;
    } 

    renderTooltip = label => {
        const anchorOrigin = label === 'likedBy' ? this.state.mouseOverLikes : this.state.mouseOverReplies
        const tooltipNames = label === 'repliedBy' ? this.filterDuplicateUserNames(label) : this.props[label];
       
        return (
            <Popper
                anchorEl={anchorOrigin}
                open={Boolean(anchorOrigin)}
                placement="top"
            >
                <Paper className={this.props.classes.tooltip}>
                    <ul className={this.props.classes.tooltipList}>
                        {tooltipNames.map((userName, key) => 
                            <li key={key}> {userName} </li>
                        )}
                    </ul>
                </Paper>
            </Popper>
        );
    }

    render() {
        const { classes, likedBy, repliedBy } = this.props;
        const LikedByTooltip = this.state.mouseOverLikes && this.renderTooltip('likedBy');
        const RepliedByTooltip = this.state.mouseOverReplies && this.renderTooltip('repliedBy');

        return (
            <div className={classes.interpretationCommentArea}>
                {!!likedBy.length && (
                    <Fragment>
                        <span
                            className={classes.intepretationLikes} 
                            onMouseEnter={this.showLikedByTooltip} 
                            onMouseLeave={this.hideLikedByTooltip}
                        >
                            {LikedByTooltip}
                            {likedBy.length} {likedBy.length > 1 ? i18n.t('likes') : i18n.t('like')}
                        </span>
                    </Fragment>
                )}
                {!!repliedBy.length && (
                    <Fragment>
                        <span
                            onMouseEnter={this.showRepliedByTooltip} 
                            onMouseLeave={this.hideRepliedByTooltip}
                        >
                            {RepliedByTooltip}
                            {`${repliedBy.length} ${repliedBy.length > 1 ? i18n.t('replies') : i18n.t('reply')}`}
                        </span>
                    </Fragment>
                )}
            </div>
        );
        
    }
};

LikesAndReplies.propTypes = {
    classes: PropTypes.object.isRequired,
    repliedBy: PropTypes.array.isRequired,
    likedBy: PropTypes.array.isRequired,
}

export default withStyles(styles)(LikesAndReplies);