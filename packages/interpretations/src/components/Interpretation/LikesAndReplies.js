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

const TOOLTIP_ENTER_DELAY = 200;
export class LikesAndReplies extends Component {
    constructor(props) {
        super(props);
        this.likesId = Math.random().toString(36);
        this.repliesId = Math.random().toString(36);
        this.likesTimeout = null;
        this.repliesTimeout = null;
        this.state = {
            mouseOverLikes: null, 
            mouseOverReplies: null 
        };
    };

    componentWillUnmount() {
        clearTimeout(this.likesTimeout);
        clearTimeout(this.repliesTimeout);
    }

    showLikedByTooltip = () => {
        if(this.likesTimeout === null) {
			this.likesTimeout = setTimeout(
				() => this.setState({ mouseOverLikes: true }),
				TOOLTIP_ENTER_DELAY
			);
		}
    };

    hideLikedByTooltip = () => {
        if (typeof this.likesTimeout === 'number') {
			clearTimeout(this.likesTimeout);
			this.likesTimeout = null;
			this.setState({ mouseOverLikes: false });
		}
    };

    showRepliedByTooltip = () => {
        if(this.repliesTimeout === null) {
			this.repliesTimeout = setTimeout(
				() => this.setState({ mouseOverReplies: true }),
				TOOLTIP_ENTER_DELAY
			);
		}
    };

    hideRepliedByTooltip = () => {
        if (typeof this.repliesTimeout === 'number') {
			clearTimeout(this.repliesTimeout);
			this.repliesTimeout = null;
			this.setState({ mouseOverReplies: false });
		}
    }

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
        const anchorEl = label === 'likedBy' ? document.getElementById(this.likesId) : document.getElementById(this.repliesId);
        const anchorOrigin = label === 'likedBy' ? this.state.mouseOverLikes : this.state.mouseOverReplies
        const tooltipNames = label === 'repliedBy' ? this.filterDuplicateUserNames() : this.props.likedBy;

        return (
            <Popper
                anchorEl={anchorEl}
                open={anchorOrigin}
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
                    id={this.likesId}
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
                    id={this.repliesId}
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
