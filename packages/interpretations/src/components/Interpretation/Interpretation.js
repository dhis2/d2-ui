import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import i18n from '@dhis2/d2-i18n';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';
import { withStyles } from '@material-ui/core/styles';
import some from 'lodash/fp/some';
import NewInterpretationField from './NewInterpretationField';
import WithAvatar from '../Avatar/WithAvatar';
import CardHeader from '../Cards/CardHeader';
import CardText from '../Cards/CardText';
import CardInfo from '../Cards/CardInfo';
import ActionButtonContainer from '../Buttons/ActionButtonContainer';
import CommentsList from '../Lists/CommentsList';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import InterpretationModel from '../../models/interpretation';
import CommentModel from '../../models/comment';
import { userCanManage, haveWriteAccess } from '../../authorization/auth';
import { formatDate } from '../../dateformats/dateformatter';
import { shouldUpdateSharing } from '../../sharing/sharing';
import styles from './styles/Interpretation.style';

export class Interpretation extends React.Component {
    constructor(props) {
        super(props);
        this.notifyChange = this.notifyChange.bind(this);
        this.onSaveInterpretation = this.onSaveInterpretation.bind(this);
        this.onDeleteInterpretation = this.onDeleteInterpretation.bind(this);
        this.onEditInterpretation = this.onEditInterpretation.bind(this);
        this.onCancelEditInterpretation = this.onCancelEditInterpretation.bind(this);
        this.onView = this.onView.bind(this);
        this.onExitView = this.onExitView.bind(this);
        this.onLike = this.onLike.bind(this);
        this.onUnlike = this.onUnlike.bind(this);
        this.onReply = this.onReply.bind(this);

        this.state = {
            interpretationToEdit: null,
            newComment: null,
            sharingDialogIsOpen: false,
            deleteDialogIsOpen: false,
        };
    };

    notifyChange(interpretation) {
        if (this.props.onChange) {
            this.props.onChange(interpretation);
        }
    };

    saveInterpretationLike(interpretation, value) {
        interpretation.like(this.context.d2, value).then(() => this.notifyChange(interpretation));
    };

    onView(event) {
        event.stopPropagation();
        this.props.onSelect(this.props.interpretation.id);
    };

    onExitView(event) {
        event.stopPropagation();
        this.props.onSelect(null);
    };

    onLike(event) {
        event.stopPropagation();
        this.saveInterpretationLike(this.props.interpretation, true);
    };

    onUnlike(event) {
        event.stopPropagation();
        this.saveInterpretationLike(this.props.interpretation, false);
    };
    
    onReply() {
        const newComment = CommentModel.getReplyForInterpretation(
            this.context.d2,
            this.props.interpretation
        );
        this.setState({ newComment });
    };

    onSaveInterpretation(interpretation) {
        interpretation.save(this.context.d2).then(() => this.notifyChange(this.props.interpretation));
        this.onCancelEditInterpretation();
    };

    onDeleteInterpretation() {
        this.props.interpretation.delete(this.context.d2).then(() => { 
            this.props.onSelect(null); 
            this.notifyChange(null);
        });
    };

    onEditInterpretation(event) {
        event.stopPropagation();
        this.setState({ interpretationToEdit: this.props.interpretation });
    };

    onCancelEditInterpretation() {
        this.setState({ interpretationToEdit: null });
    };

    onOpenSharingDialog = event => {
        event.stopPropagation();
        this.setState({ sharingDialogIsOpen: true });
    };

    onCloseSharingDialog = newSharingInfo => {
        if (shouldUpdateSharing(newSharingInfo, this.props.interpretation)) {
            const sharingProperties = Object.assign({}, this.props.interpretation, newSharingInfo);
            const updatedInterpretation = new InterpretationModel(this.props.model, sharingProperties);
            this.onSaveInterpretation(updatedInterpretation);        
        }
        this.setState({ sharingDialogIsOpen: false });
    };

    onOpenDeleteDialog = event => {
        event.stopPropagation();
        this.setState({ deleteDialogIsOpen: true });
    };

    onCloseDeleteDialog = () =>
        this.setState({ deleteDialogIsOpen: false });
    
    getOnClickHandlers = () => [
        this.onUnlike, this.onLike, this.onView,
        this.onExitView, this.onOpenSharingDialog, this.onEditInterpretation, 
        this.onOpenDeleteDialog, this.onReply,
    ];

    getLikedByNames = () => {
        const likedBy = this.props.interpretation.likedBy || [];
        return likedBy.map(user => user.displayName).sort();
    };

    getRepliedByNames = () => {
        const repliedBy = this.props.interpretation.comments || [];
        return repliedBy.map(comment => comment.user.displayName).sort();
    };

    renderInterpretation = () => {
        const { classes, model, userGroups, extended, interpretation } = this.props;

        if (this.state.interpretationToEdit) {
            return (
                <NewInterpretationField
                    model={model}
                    type={'interpretation'}
                    interpretation={this.state.interpretationToEdit}
                    onUpdate={this.onSaveInterpretation}
                    onClose={this.onCancelEditInterpretation}
                />
            )
        } else {
            const currentUserLikesInterpretation = some(user => 
                user.id === this.context.d2.currentUser.id, interpretation.likedBy);

            return (
                <WithAvatar 
                    className={extended ? classes.expanded : classes.compact} 
                    displayName={interpretation.user.displayName}
                    onClick={!extended ? this.onView : null}
                >
                    <CardHeader userName={interpretation.user.displayName} />                        
                    <CardText extended={extended} text={interpretation.text} />
                    <CardInfo 
                        likedBy={this.getLikedByNames()}
                        repliedBy={this.getRepliedByNames()}
                        createdDate={formatDate(interpretation.created, this.context.locale)}
                    />
                    <ActionButtonContainer
                        isFocused={extended}
                        interpretationId={interpretation.id}
                        currentUserLikesInterpretation={currentUserLikesInterpretation}
                        canReply={haveWriteAccess(this.context.d2, userGroups, interpretation)}
                        canManage={userCanManage(this.context.d2, interpretation)}
                        onClickHandlers={this.getOnClickHandlers()}
                    />
                </WithAvatar>
            );
        }
    };

    renderComments = () => 
        this.props.extended && (
            <CommentsList
                interpretation={this.props.interpretation}
                canReply={haveWriteAccess(this.context.d2, this.props.userGroups, this.props.interpretation)}
                newComment={this.state.newComment}
                onChange={this.notifyChange}
            />
        );

    renderSharingDialog = () => 
        this.state.sharingDialogIsOpen && (
            <SharingDialog
                open={true}
                onRequestClose={this.onCloseSharingDialog}
                d2={this.context.d2}
                id={this.props.interpretation.id}
                type={'interpretation'}
            />
        );

    renderDeleteInterpretationDialog = () => 
        this.state.deleteDialogIsOpen && (
            <DeleteDialog
                title={i18n.t('Delete interpretation')}
                text={i18n.t('Are you sure you want to delete this interpretation?')}
                onDelete={this.onDeleteInterpretation}
                onCancel={this.onCloseDeleteDialog}
            />
        );

    render() {
        const Interpretation = this.renderInterpretation();
        const Comments = this.renderComments();
        const SharingDialog = this.renderSharingDialog();
        const DeleteInterpretationDialog = this.renderDeleteInterpretationDialog();

        return this.props.haveReadAccess ? (
            <Fragment>
                {Interpretation}
                {Comments}
                {SharingDialog}
                {DeleteInterpretationDialog}
            </Fragment>
        ) : <div className={this.props.classes.restricted}>{i18n.t('Access restricted')}</div>;
    };
}

Interpretation.propTypes = {
    classes: PropTypes.object.isRequired,
    interpretation: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func,
    extended: PropTypes.bool.isRequired,
};

Interpretation.contextTypes = {
    d2: PropTypes.object.isRequired,
    locale: PropTypes.string,
};

export default withStyles(styles)(Interpretation);
