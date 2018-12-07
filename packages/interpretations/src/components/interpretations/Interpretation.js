import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';
import { withStyles } from '@material-ui/core/styles';
import some from 'lodash/fp/some';
import InterpretationComments from './InterpretationComments';
import InterpretationDialog from './InterpretationDialog';
import InterpretationIcon from './InterpretationIcon';
import { getUserLink } from './misc';
import { userCanManage } from '../../util/auth';
import CommentModel from '../../models/comment';
import { formatDate } from '../../util/i18n';

import { styles } from './styles/Interpretation.style';
class Interpretation extends React.Component {
    state = {
        newComment: null,
        interpretationToEdit: null,
        sharingDialogIsOpen: false,
    };

    constructor(props) {
        super(props);
        this.notifyChange = this.notifyChange.bind(this);
        this.saveInterpretationAndClose = this.saveInterpretationAndClose.bind(this);
        this.closeInterpretationDialog = this.closeInterpretationDialog.bind(this);
        this.deleteInterpretation = this.deleteInterpretation.bind(this);
        this.openInterpretationDialog = this.openInterpretationDialog.bind(this);
        this.view = this.view.bind(this);
        this.exitView = this.exitView.bind(this);
        this.like = this.like.bind(this);
        this.reply = this.reply.bind(this);
        this.unlike = this.unlike.bind(this);
        this.saveComment = this.saveComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    notifyChange(interpretation) {
        if (this.props.onChange) {
            this.props.onChange(interpretation);
        }
    }

    saveInterpretationLike(interpretation, value) {
        interpretation.like(value).then(() => this.notifyChange(interpretation));
    }

    view() {
        this.props.onSelect(this.props.interpretation.id);
    }

    exitView() {
        this.props.onSelect(null);
    }

    like() {
        this.saveInterpretationLike(this.props.interpretation, true);
    }

    unlike() {
        this.saveInterpretationLike(this.props.interpretation, false);
    }

    reply() {
        const newComment = CommentModel.getReplyForInterpretation(
            this.context.d2,
            this.props.interpretation
        );
        this.setState({ newComment });
    }

    deleteInterpretation() {
        const { interpretation } = this.props;

        if (window.confirm(i18n.t('Are you sure you want to remove this interpretation?'))) {
            interpretation.delete().then(() => this.notifyChange(null));
        }
    }

    openInterpretationDialog() {
        this.setState({ interpretationToEdit: this.props.interpretation });
    }

    closeInterpretationDialog() {
        this.setState({ interpretationToEdit: null });
    }

    saveInterpretation(interpretation) {
        interpretation.save().then(() => this.notifyChange(this.props.interpretation));
    }

    saveComment(comment) {
        comment.save().then(() => this.notifyChange(this.props.interpretation));
    }

    deleteComment(comment) {
        comment.delete().then(() => this.notifyChange(this.props.interpretation));
    }

    saveInterpretationAndClose() {
        this.saveInterpretation(this.props.interpretation);
        this.closeInterpretationDialog();
    }

    openSharingDialog = () => {
        this.setState({ sharingDialogIsOpen: true });
    };

    closeSharingDialog = () => {
        this.setState({ sharingDialogIsOpen: false });
    };

    render() {
        const { classes, interpretation, extended } = this.props;
        const { interpretationToEdit, newComment, sharingDialogIsOpen } = this.state;
        const { d2 } = this.context;
        const showActions = extended;
        const showComments = extended;
        const likedBy = interpretation.likedBy || [];
        const currentUserLikesInterpretation = some(user => user.id === d2.currentUser.id, likedBy);

        return (
            <Fragment>
                {interpretationToEdit && (
                    <InterpretationDialog
                        interpretation={interpretationToEdit}
                        onSave={this.saveInterpretationAndClose}
                        onClose={this.closeInterpretationDialog}
                    />
                )}
                {sharingDialogIsOpen && (
                    <SharingDialog
                        open={true}
                        onRequestClose={this.closeSharingDialog}
                        d2={d2}
                        id={interpretation.id}
                        type={'interpretation'}
                    />
                )}

                <div className={classes.interpretationDescSection}>
                    <div className={classes.interpretationName}>
                        {getUserLink(d2, interpretation.user)}

                        <span className={classes.date}>
                            {formatDate(interpretation.created, this.context.locale)}
                        </span>
                    </div>

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

                    <div className={classes.interpretationCommentArea}>
                        {!!interpretation.likes && <span className={classes.intepretationLikes}>{interpretation.likes} {i18n.t('likes')}</span>}
                        {!!interpretation.comments.length && <span>{`${interpretation.comments.length} ${i18n.t('replies')}`}</span>}
                    </div>
                        {showActions ? (
                            <div className={classes.actions}>
                                {currentUserLikesInterpretation ? (
                                    <InterpretationIcon 
                                        iconType={'like'} 
                                        tooltip={i18n.t('Unlike')} 
                                        onClick={this.unlike}
                                    />
                                ) : (
                                    <InterpretationIcon 
                                        iconType={'unlike'} 
                                        tooltip={i18n.t('Like')} 
                                        onClick={this.like}
                                    />
                                )}
                                <InterpretationIcon 
                                    iconType={'reply'} 
                                    tooltip={i18n.t('Reply')} 
                                    onClick={this.reply}
                                />
                                <InterpretationIcon 
                                        iconType={'visibilityOff'} 
                                        tooltip={i18n.t('Exit View')} 
                                        onClick={this.exitView}
                                />
                                {userCanManage(d2, interpretation) && (
                                <Fragment>
                                    <InterpretationIcon 
                                        iconType={'share'} 
                                        tooltip={i18n.t('Share')} 
                                        onClick={this.openSharingDialog}
                                    />
                                    <InterpretationIcon 
                                        iconType={'edit'} 
                                        tooltip={i18n.t('Edit')} 
                                        onClick={this.openInterpretationDialog}
                                    />      
                                    <InterpretationIcon 
                                        iconType={'delete'} 
                                        tooltip={i18n.t('Delete')} 
                                        onClick={this.deleteInterpretation}
                                    />
                                </Fragment>
                            )}
                            </div>
                        ) : (
                            <div className={classes.actions}>
                                <InterpretationIcon 
                                    iconType={'visibility'} 
                                    tooltip={i18n.t('View')}  
                                    onClick={this.view}
                                />
                            </div>
                        )}
                </div>
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
