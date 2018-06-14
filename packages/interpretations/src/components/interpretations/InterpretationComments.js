import React from 'react';
import { Link, ActionSeparator, WithAvatar, getUserLink } from './misc';
import CommentTextarea from './CommentTextarea';
import { userCanManage } from '../../util/auth';
import PropTypes from 'prop-types';
import CommentModel from '../../models/comment';
import i18n from '@dhis2/d2-i18n'
import orderBy from 'lodash/fp/orderBy';
import styles from './InterpretationsStyles.js';
import { formatRelative } from '../../util/i18n';

const Comment = ({ comment, showActions, onEdit, onDelete }) => (
    <div>
        <div style={styles.commentText}>
            {comment.text}
        </div>

        <span style={styles.tipText}>
            {formatRelative(comment.created)}
        </span>

        <ActionSeparator labelText="" />

        {showActions &&
            <span>
                <Link label={i18n.t('Edit')} onClick={() => onEdit(comment)} />
                <ActionSeparator />
                <Link label={i18n.t('Delete')} onClick={() => onDelete(comment)} />
            </span>}
    </div>
);

export default class InterpretationComments extends React.Component {
    static contextTypes = {
        d2: PropTypes.object.isRequired,
    };

    static propTypes = {
        interpretation: PropTypes.object.isRequired,
        onSave: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
    };

    state = {
        commentToEdit: null,
    };

    constructor(props) {
        super(props);
        this.onSave = this.onSave.bind(this);
        this.onCancelEdit = this.onCancelEdit.bind(this);
    }

    onEdit(comment) {
        this.setState({ commentToEdit: comment });
    }

    onCancelEdit(comment) {
        this.setState({ commentToEdit: null });
    }

    onDelete(comment) {
        if (confirm(i18n.t('Are you sure you want to remove this comment?'))) {
            this.props.onDelete(comment);
        }
    }

    onSave(comment) {
        this.props.onSave(comment);
        this.setState({ commentToEdit: null });
    }

    render() {
        const { interpretation } = this.props;
        const { d2 } = this.context;
        const { commentToEdit } = this.state;
        const comments = orderBy(["created"], ["desc"], interpretation.comments);
        const newComment = new CommentModel(interpretation, {text: ""});

        return (
            <div>
                <WithAvatar user={d2.currentUser}>
                    <CommentTextarea comment={newComment} onPost={this.onSave} />
                </WithAvatar>

                <div className="interpretation-comments">
                    {comments.map(comment =>
                        <WithAvatar key={comment.id} user={comment.user}>
                            <div style={styles.commentAuthor}>
                                {getUserLink(d2, comment.user)}
                            </div>

                            {commentToEdit && commentToEdit.id === comment.id
                                ?
                                    <CommentTextarea
                                        comment={comment}
                                        onPost={this.onSave}
                                        onCancel={this.onCancelEdit}
                                    />
                                :
                                    <Comment
                                        comment={comment}
                                        showActions={userCanManage(d2, comment)}
                                        onEdit={() => this.onEdit(comment)}
                                        onDelete={() => this.onDelete(comment)}
                                    />
                            }
                        </WithAvatar>
                    )}
                </div>
            </div>
        );
    }
};
