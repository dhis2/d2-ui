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
import LikesAndReplies from './LikesAndReplies';
import ActionButtonContainer from '../Buttons/ActionButtonContainer';
import CommentsList from '../Lists/CommentsList';
import DeleteDialog from '../DeleteDialog/DeleteDialog';
import InterpretationModel from '../../models/interpretation';
import { userCanManage } from '../../authorization/auth';
import { isEdited } from '../../dateformats/dateformatter';
import styles from './styles/Interpretation.style';

export class Interpretation extends React.Component {
    constructor(props) {
        super(props);
        this.notifyChange = this.notifyChange.bind(this);
        this.onSaveInterpretation = this.onSaveInterpretation.bind(this);
        this.onDeleteInterpretation = this.onDeleteInterpretation.bind(this);
        this.onEditInterpretation = this.onEditInterpretation.bind(this);
        this.onCancelEditInterpretation = this.onCancelEditInterpretation.bind(this);
        this.view = this.view.bind(this);
        this.exitView = this.exitView.bind(this);
        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);

        this.state = {
            interpretationToEdit: null,
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

    view(event) {
        event.stopPropagation();
        this.props.onSelect(this.props.interpretation.id);
    };

    exitView(event) {
        event.stopPropagation();
        this.props.onSelect(null);
    };

    like(event) {
        event.stopPropagation();
        this.saveInterpretationLike(this.props.interpretation, true);
    };

    unlike(event) {
        event.stopPropagation();
        this.saveInterpretationLike(this.props.interpretation, false);
    };

    onSaveInterpretation(interpretation) {
        interpretation.save(this.context.d2).then(() => this.notifyChange(this.props.interpretation));
        this.onCancelEditInterpretation();
    };

    onDeleteInterpretation() {
        this.props.interpretation.delete(this.context.d2).then(() => this.notifyChange(null));
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
        this.props.interpretation.publicAccess = newSharingInfo.publicAccess;
        this.props.interpretation.externalAccess = newSharingInfo.externalAccess;
        this.props.interpretation.userAccesses = newSharingInfo.userAccesses;
        this.props.interpretation.userGroupAccesses = newSharingInfo.userGroupAccesses;
        
        const updatedInterpretation = new InterpretationModel(this.props.model, this.props.interpretation);
        this.onSaveInterpretation(updatedInterpretation);        
        this.setState({ sharingDialogIsOpen: false });
    }

    onOpenDeleteDialog = event => {
        event.stopPropagation();
        this.setState({ deleteDialogIsOpen: true });
    }

    onCloseDeleteDialog = () =>
        this.setState({ deleteDialogIsOpen: false });
    
    getOnClickHandlers = () => [
        this.unlike, this.like, this.view,
        this.exitView, this.onOpenSharingDialog, this.onEditInterpretation, 
        this.onOpenDeleteDialog,
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
        const { classes, model, extended, interpretation } = this.props;

        if (this.state.interpretationToEdit) {
            return (
                <NewInterpretationField
                    model={model}
                    interpretation={this.state.interpretationToEdit}
                    onUpdate={this.onSaveInterpretation}
                    onClose={this.onCancelEditInterpretation}
                />
            )
        } else {
            const currentUserLikesInterpretation = some(user => 
                user.id === this.context.d2.currentUser.id, this.props.interpretation.likedBy);
            
            return (
                <WithAvatar 
                    className={extended ? classes.expanded : classes.compact} 
                    user={interpretation.user} 
                    onClick={!extended ? this.view : null}
                >
                    <CardHeader userName={interpretation.user.displayName} />                        
                    <CardText
                        extended={extended} 
                        text={interpretation.text}
                    />
                    <LikesAndReplies
                        createdDate={this.props.interpretation.created}
                        likedBy={this.getLikedByNames()}
                        repliedBy={this.getRepliedByNames()}
                        isEdited={isEdited(interpretation.created, interpretation.lastUpdated)}
                    />
                    <ActionButtonContainer
                        isFocused={extended}
                        currentUserLikesInterpretation={currentUserLikesInterpretation}
                        isOwner={userCanManage(this.context.d2, interpretation)}
                        onClickHandlers={this.getOnClickHandlers()}
                    />
                </WithAvatar>
            );
        }
    }

    renderComments = () => 
        this.props.extended && (
            <CommentsList
                interpretation={this.props.interpretation}
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

        return (
            <Fragment>
                {Interpretation}
                {Comments}
                {SharingDialog}
                {DeleteInterpretationDialog}
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

Interpretation.contextTypes = {
    d2: PropTypes.object.isRequired,
    locale: PropTypes.string,
};

export default withStyles(styles)(Interpretation);