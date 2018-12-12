import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';
import { withStyles } from '@material-ui/core/styles';
import some from 'lodash/fp/some';

import NewInterpretation from './NewInterpretation';
import CardHeader from './CardHeader';
import CardText from './CardText';
import LikesAndReplies from './LikesAndReplies';
import ActionButton from './ActionButton';
import CommentList from '../InterpretationCommments/CommentList';
import { userCanManage } from '../../authorization/auth';
import CommentModel from '../../models/comment';
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
        interpretation.like(this.context.d2, value).then(() => this.notifyChange(interpretation));
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
            this.props.interpretation.delete(this.context.d2).then(() => this.notifyChange(null));
        }
    };

    openInterpretation() {
        this.setState({ interpretationToEdit: this.props.interpretation });
    };

    closeInterpretation() {
        this.setState({ interpretationToEdit: null });
    };

    saveInterpretation(interpretation) {
        interpretation.save(this.context.d2).then(() => this.notifyChange(this.props.interpretation));
    };

    saveComment(comment) {
        comment.save(this.context.d2).then(() => this.notifyChange(this.props.interpretation));
    };

    deleteComment(comment) {
        comment.delete(this.context.d2).then(() => this.notifyChange(this.props.interpretation));
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

        const showActions = extended;
        const showComments = extended;

        const likedBy = interpretation.likedBy || [];
        const likedByTooltip = likedBy
            .map(user => user.displayName)
            .sort();

        const repliedBy = interpretation.comments || [];
        const repliedByTooltip = repliedBy
            .map(comment => comment.user.displayName)
            .sort();
        
        const currentUserLikesInterpretation = some(user => user.id === this.context.d2.currentUser.id, likedBy);

        return (
            <div className={classes.listItem}>
                {sharingDialogIsOpen && (
                    <SharingDialog
                        open={true}
                        onRequestClose={this.closeSharingDialog}
                        d2={this.context.d2}
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
                    <div className={classes.cardBody}>
                        <CardHeader cardInfo={interpretation} />                        
                        <CardText 
                            extended={extended} 
                            text={interpretation.text} 
                        />
                        <LikesAndReplies
                            likedBy={likedByTooltip}
                            repliedBy={repliedByTooltip}
                        />
                        <div className={classes.actions}>
                            {showActions ? (
                                currentUserLikesInterpretation ? (
                                    <ActionButton 
                                        iconType={'like'} 
                                        tooltip={i18n.t('Unlike')} 
                                        onClick={this.unlike}
                                    />
                                ) : (
                                    <ActionButton 
                                        iconType={'unlike'} 
                                        tooltip={i18n.t('Like')} 
                                        onClick={this.like}
                                    />
                                ),
                                <Fragment>
                                    <ActionButton 
                                        iconType={'reply'} 
                                        tooltip={i18n.t('Reply')} 
                                        onClick={this.reply}
                                    />
                                    <ActionButton 
                                        iconType={'visibilityOff'} 
                                        tooltip={i18n.t('Exit View')} 
                                        onClick={this.exitView}
                                    />
                                    {userCanManage(this.context.d2, interpretation) && (
                                        <Fragment>
                                            <ActionButton 
                                                iconType={'share'} 
                                                tooltip={i18n.t('Share')} 
                                                onClick={this.openSharingDialog}
                                            />
                                            <ActionButton 
                                                iconType={'edit'} 
                                                tooltip={i18n.t('Edit')} 
                                                onClick={this.openInterpretation}
                                            />      
                                            <ActionButton 
                                                iconType={'delete'} 
                                                tooltip={i18n.t('Delete')} 
                                                onClick={this.deleteInterpretation}
                                            />
                                        </Fragment>
                                    )}
                                </Fragment>
                            ) : (
                                <ActionButton 
                                    iconType={'visibility'} 
                                    tooltip={i18n.t('View')}  
                                    onClick={this.view}
                                />
                            )}
                        </div>
                    </div>
                )}
                {showComments && (
                    <CommentList
                        interpretation={interpretation}
                        onSave={this.saveComment}
                        onDelete={this.deleteComment}
                        newComment={newComment}
                    />
                )}
            </div>
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