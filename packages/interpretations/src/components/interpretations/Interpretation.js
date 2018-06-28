import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import { SvgIcon } from '@dhis2/d2-ui-core';
import i18n from '@dhis2/d2-i18n'
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';
import some from 'lodash/fp/some';
import InterpretationComments from './InterpretationComments';
import InterpretationDialog from './InterpretationDialog';
import { Link, ActionSeparator, WithAvatar, getUserLink } from './misc';
import { userCanManage } from '../../util/auth';
import styles from './InterpretationsStyles.js';
import CommentModel from '../../models/comment';
import { formatDate } from '../../util/i18n';

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

    like() {
        this.saveInterpretationLike(this.props.interpretation, true);
    }

    unlike() {
        this.saveInterpretationLike(this.props.interpretation, false);
    }

    reply() {
        const newComment = CommentModel.getReplyForInterpretation(this.context.d2, this.props.interpretation);
        this.setState({ newComment });
    }

    deleteInterpretation() {
        const { interpretation } = this.props;

        if (confirm(i18n.t('Are you sure you want to remove this interpretation?'))) {
            interpretation.delete().then(() => this.notifyChange(null));
        }
    }

    openInterpretationDialog() {
        this.setState({interpretationToEdit: this.props.interpretation});
    }

    closeInterpretationDialog() {
        this.setState({interpretationToEdit: null});
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

    openSharingDialog = () => { this.setState({ sharingDialogIsOpen: true }); }

    closeSharingDialog = () => { this.setState({ sharingDialogIsOpen: false }); }

    render() {
        const { interpretation, extended, mentions } = this.props;
        const { interpretationToEdit, newComment, sharingDialogIsOpen } = this.state;
        const { d2 } = this.context;
        const showActions = extended;
        const showComments = extended;
        const likedBy = interpretation.likedBy || [];
        const likedByTooltip = likedBy.map(user => user.displayName).sort().join("\n");
        const currentUserLikesInterpretation = some(user => user.id === d2.currentUser.id, likedBy);

        return (
            <div>
                {interpretationToEdit &&
                    <InterpretationDialog
                        interpretation={interpretationToEdit}
                        onSave={this.saveInterpretationAndClose}
                        onClose={this.closeInterpretationDialog}
                        mentions={mentions}
                    />
                }
                {sharingDialogIsOpen &&
                    <SharingDialog
                        open={true}
                        onRequestClose={this.closeSharingDialog}
                        d2={d2}
                        id={interpretation.id}
                        type={"interpretation"}
                    />
                }

                <div style={styles.interpretationDescSection}>
                    <div style={styles.interpretationName}>
                        {getUserLink(d2, interpretation.user)}

                        <span style={styles.date}>
                            {formatDate(interpretation.created)}
                        </span>
                    </div>

                    <div style={styles.interpretationTextWrapper}>
                        <style>{styles.richTextCss}</style>
                        
                        <div className="richText"
                            style={extended ? {} : styles.interpretationTextLimited}
                            dangerouslySetInnerHTML={{__html: interpretation.text}}>
                        </div>
                    </div>

                    <div>
                        {showActions &&
                            <div className="actions" style={styles.actions}>
                                {currentUserLikesInterpretation
                                    ? <Link label={i18n.t('Unlike')} onClick={this.unlike} />
                                    : <Link label={i18n.t('Like')} onClick={this.like} />}
                                    
                                <ActionSeparator />

                                <Link label={i18n.t('Reply')} onClick={this.reply} />

                                {userCanManage(d2, interpretation) &&
                                    <span className="owner-actions">
                                        <ActionSeparator />
                                        <Link label={i18n.t('Edit')} onClick={this.openInterpretationDialog} />
                                        <ActionSeparator />
                                        <Link label={i18n.t('Share')} onClick={this.openSharingDialog} />
                                        <ActionSeparator />
                                        <Link label={i18n.t('Delete')} onClick={this.deleteInterpretation} />
                                    </span>}
                            </div>
                        }

                        <div style={styles.interpretationCommentArea}>
                            <div style={styles.likeArea}>
                                <SvgIcon icon="ThumbUp" style={styles.likeIcon} />

                                <span style={{color: "#22A"}} className="liked-by" title={likedByTooltip}>
                                    {interpretation.likes} {i18n.t('people like this')}
                                </span>

                                <ActionSeparator />

                                {`${interpretation.comments.length} ${i18n.t('people commented')}`}
                            </div>

                            {showComments &&
                                <InterpretationComments
                                    d2={d2}
                                    interpretation={interpretation}
                                    onSave={this.saveComment}
                                    onDelete={this.deleteComment}
                                    mentions={mentions}
                                    newComment={newComment}
                                />}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Interpretation.propTypes = {
    interpretation: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    extended: PropTypes.bool.isRequired,
};

Interpretation.defaultProps = {
    extended: false,
};

Interpretation.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default Interpretation;
