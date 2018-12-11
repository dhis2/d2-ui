import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';
import { withStyles } from '@material-ui/core/styles';
import some from 'lodash/fp/some';
import InterpretationComments from './InterpretationComments';
import NewInterpretation from './NewInterpretation';
import InterpretationActionButton from './InterpretationActionButton';
import { getUserLink } from './misc';
import { userCanManage } from '../../util/auth';
import CommentModel from '../../models/comment';
import { formatRelative } from '../../util/i18n';
import styles from './styles/Interpretation.style';
export class Interpretation extends React.Component {
    state = {
        newComment: null,
        interpretationToEdit: null,
        sharingDialogIsOpen: false,
    };

    constructor(props) {
        super(props);
        this.notifyChange = this.notifyChange.bind(this);
        this.saveInterpretationAndClose = this.saveInterpretationAndClose.bind(this);
        this.closeInterpretation = this.closeInterpretation.bind(this);
        this.deleteInterpretation = this.deleteInterpretation.bind(this);
        this.openInterpretation = this.openInterpretation.bind(this);
        this.view = this.view.bind(this);
        this.exitView = this.exitView.bind(this);
        this.like = this.like.bind(this);
        this.reply = this.reply.bind(this);
        this.unlike = this.unlike.bind(this);
        this.saveComment = this.saveComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    };

    notifyChange(interpretation) {
        if (this.props.onChange) {
            this.props.onChange(interpretation);
        }
    };

    saveInterpretationLike(interpretation, value) {
        interpretation.like(value).then(() => this.notifyChange(interpretation));
    };

    view() {
        this.props.onSelect(this.props.interpretation.id);
    };

    exitView() {
        this.props.onSelect(null);
    };

    like() {
        this.saveInterpretationLike(this.props.interpretation, true);
    };

    unlike() {
        this.saveInterpretationLike(this.props.interpretation, false);
    };

    reply() {
        const newComment = CommentModel.getReplyForInterpretation(
            this.context.d2,
            this.props.interpretation
        );
        this.setState({ newComment });
    };

    deleteInterpretation() {
        if (window.confirm(i18n.t('Are you sure you want to remove this interpretation?'))) {
            this.props.interpretation.delete().then(() => this.notifyChange(null));
        }
    };

    openInterpretation() {
        this.setState({ interpretationToEdit: this.props.interpretation });
    };

    closeInterpretation() {
        this.setState({ interpretationToEdit: null });
    };

    saveInterpretation(interpretation) {
        interpretation.save().then(() => this.notifyChange(this.props.interpretation));
    };

    saveComment(comment) {
        comment.save().then(() => this.notifyChange(this.props.interpretation));
    };

    deleteComment(comment) {
        comment.delete().then(() => this.notifyChange(this.props.interpretation));
    };

    saveInterpretationAndClose() {
        this.saveInterpretation(this.props.interpretation);
        this.closeInterpretation();
    };

    openSharingDialog = () => {
        this.setState({ sharingDialogIsOpen: true });
    };

    closeSharingDialog = () => {
        this.setState({ sharingDialogIsOpen: false });
    };

    render() {
        const { classes, interpretation, extended, model } = this.props;
        const { interpretationToEdit, newComment, sharingDialogIsOpen } = this.state;
        const { d2 } = this.context;
        const showActions = extended;
        const showComments = extended;
        const likedBy = interpretation.likedBy || [];
        const likedByTooltip = likedBy
        .map(user => user.displayName)
        .sort()
        .join('\n');
        const currentUserLikesInterpretation = some(user => user.id === d2.currentUser.id, likedBy);

        return (
            <Fragment>
                {sharingDialogIsOpen && (
                    <SharingDialog
                        open={true}
                        onRequestClose={this.closeSharingDialog}
                        d2={d2}
                        id={interpretation.id}
                        type={'interpretation'}
                    />
                )}
                
                {interpretationToEdit ? (
                    <NewInterpretation
                        model={model}
                        newInterpretation={interpretationToEdit}
                        onSave={this.props.onSave}
                        onClose={this.closeInterpretation}
                        isNew={false}
                    />
                ) : (
                    //TODO: Replace with card header component.
                    <div className={classes.interpretationDescSection}>
                        <div className={classes.interpretationName}>
                            {getUserLink(d2, interpretation.user)}

                            <span className={classes.date}>
                                {formatRelative(interpretation.created, this.context.locale)}
                            </span>
                        </div>
                    {/*TODO: Replace with interpretation text component */}
                        <div className={classes.interpretationTextWrapper}>
                            <div
                                className={
                                    extended
                                        ? classes.interpretationText
                                        : classes.interpretationTextLimited
                                }
                            >
                                {interpretation.text}
                            </div>
                        </div>

                    {/* TODO: Replace with InterpretationFeedback component */}
                        <div className={classes.interpretationCommentArea}>
                            {!!interpretation.likes && (
                                <span className={classes.intepretationLikes}>
                                    {interpretation.likes} {interpretation.likes > 1 ? i18n.t('likes') : i18n.t('like')}
                                </span>
                            )}
                            {!!interpretation.comments.length && (
                                <span>
                                    {`${interpretation.comments.length} ${interpretation.comments.length > 1 ? i18n.t('replies') : i18n.t('reply')}`}
                                </span>
                            )}
                        </div>
                        {/* TODO: create new component and render action buttons with .map() */}
                            {showActions ? (
                                <div className={classes.actions}>
                                    {currentUserLikesInterpretation ? (
                                        <InterpretationActionButton 
                                            iconType={'like'} 
                                            tooltip={i18n.t('Unlike')} 
                                            onClick={this.unlike}
                                        />
                                    ) : (
                                        <InterpretationActionButton 
                                            iconType={'unlike'} 
                                            tooltip={i18n.t('Like')} 
                                            onClick={this.like}
                                        />
                                    )}
                                    <InterpretationActionButton 
                                        iconType={'reply'} 
                                        tooltip={i18n.t('Reply')} 
                                        onClick={this.reply}
                                    />
                                    <InterpretationActionButton 
                                            iconType={'visibilityOff'} 
                                            tooltip={i18n.t('Exit View')} 
                                            onClick={this.exitView}
                                    />
                                    {userCanManage(d2, interpretation) && (
                                    <Fragment>
                                        <InterpretationActionButton 
                                            iconType={'share'} 
                                            tooltip={i18n.t('Share')} 
                                            onClick={this.openSharingDialog}
                                        />
                                        <InterpretationActionButton 
                                            iconType={'edit'} 
                                            tooltip={i18n.t('Edit')} 
                                            onClick={this.openInterpretation}
                                        />      
                                        <InterpretationActionButton 
                                            iconType={'delete'} 
                                            tooltip={i18n.t('Delete')} 
                                            onClick={this.deleteInterpretation}
                                        />
                                    </Fragment>
                                )}
                                </div>
                            ) : (
                                <div className={classes.actions}>
                                    <InterpretationActionButton 
                                        iconType={'visibility'} 
                                        tooltip={i18n.t('View')}  
                                        onClick={this.view}
                                    />
                                </div>
                            )}
                    </div> 
                )}
                {showComments && (
                    <InterpretationComments
                        d2={d2}
                        interpretation={interpretation}
                        onSave={this.saveComment}
                        onDelete={this.deleteComment}
                        newComment={newComment}
                    />
                )}
            </Fragment>
        );
    }
}

Interpretation.propTypes = {
    classes: PropTypes.object.isRequired,
    interpretation: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    extended: PropTypes.bool.isRequired,
};

Interpretation.defaultProps = {
    extended: false,
};

Interpretation.contextTypes = {
    d2: PropTypes.object.isRequired,
    locale: PropTypes.string,
};

export default withStyles(styles)(Interpretation);

/*

<Fragment>
                        <InterpretationCardHeader 
                            d2={d2}
                            interpretation={interpretation}
    
                        />
                        <InterpretationText 
                            text={interpretation.text}
                        />
                        <InterpretationFeedback 
                            likes={interpretation.likes}
                            replies={interpretation.comments}
                        />
                    </Fragment>

                    */