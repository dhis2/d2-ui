import React, { Fragment, Component } from 'react';
import i18n from '@dhis2/d2-i18n';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import debounce from 'lodash/debounce';
import TextSeparator from '../TextSeparator/TextSeparator';
import { formatRelative } from '../../dateformats/dateformatter';
import styles from './styles/LikesAndReplies.style';

export class LikesAndReplies extends Component {
    state = { mouseOverLikes: null, mouseOverReplies: null  };

    showLikedByTooltip = event => this.setState({ mouseOverLikes: event.currentTarget, });

    hideLikedByTooltip = () => this.setState({ mouseOverLikes: null });

    showRepliedByTooltip = event => this.setState({ mouseOverReplies: event.currentTarget });

    hideRepliedByTooltip = () => this.setState({ mouseOverReplies: null });

    filterDuplicateUserNames = () => {
        let listItems = [];
        
        this.props.repliedBy.forEach(userName => {
            if (!listItems.includes(userName)) {
                listItems = [...listItems, userName];
            }
        })
        return listItems;
    }; 

    renderTooltip = label => {
        const anchorOrigin = label === 'likedBy' ? this.state.mouseOverLikes : this.state.mouseOverReplies
        const tooltipNames = label === 'repliedBy' ? this.filterDuplicateUserNames() : this.props.likedBy;
       
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
    };

    renderDate = () => (
        <span> {formatRelative(this.props.createdDate, this.context.locale)} </span>
    );

    renderLikes = () => {
        const { likedBy} = this.props;
        const LikedByTooltip = this.state.mouseOverLikes && this.renderTooltip('likedBy');

        return (
            <Fragment>
                <TextSeparator />
                <span
                    onMouseEnter={this.showLikedByTooltip} 
                    onMouseLeave={this.hideLikedByTooltip}
                >
                    {LikedByTooltip}
                    {likedBy.length} {likedBy.length > 1 ? i18n.t('likes') : i18n.t('like')}
                </span>
            </Fragment>
        );
    };

    renderReplies = () => {
        const { repliedBy } = this.props;
        const RepliedByTooltip = this.state.mouseOverReplies && this.renderTooltip('repliedBy');

        return (
            <Fragment>
                <TextSeparator />
                <span
                    onMouseEnter={this.showRepliedByTooltip} 
                    onMouseLeave={this.hideRepliedByTooltip}
                >
                    {RepliedByTooltip}
                    {`${repliedBy.length} ${repliedBy.length > 1 ? i18n.t('replies') : i18n.t('reply')}`}
                </span>
            </Fragment>
        );
    };

    renderEditLabel = () => 
        this.props.isEdited && (
            <span className={this.props.classes.editLabel}>{i18n.t(('(edited)'))}</span>
        );

    render() {
        const { classes, likedBy, repliedBy } = this.props;

        const CreatedDate = this.renderDate();
        const Likes = !!likedBy.length && this.renderLikes();
        const Replies = !!repliedBy.length && this.renderReplies();
        const isEdited = this.renderEditLabel();

        return (
            <div className={classes.interpretationCommentArea}>
                {CreatedDate}
                {Likes}
                {Replies}
                {isEdited}
            </div>
        );
    };
};

LikesAndReplies.propTypes = {
    classes: PropTypes.object.isRequired,
    repliedBy: PropTypes.array.isRequired,
    likedBy: PropTypes.array.isRequired,
};

export default withStyles(styles)(LikesAndReplies);
