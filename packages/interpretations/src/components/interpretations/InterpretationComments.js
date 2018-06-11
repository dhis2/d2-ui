import React from 'react';
import { Link, ActionSeparator, WithAvatar, getUserLink } from './misc';
import CommentTextarea from './CommentTextarea';
import { userCanManage } from '../../util/auth';
import { FormattedRelative } from 'react-intl';
import PropTypes from 'prop-types';
import CommentModel from '../../models/comment';
import { config } from 'd2/lib/d2';
import orderBy from 'lodash/fp/orderBy';
import styles from './InterpretationsStyles.js';

config.i18n.strings.add('edit');
config.i18n.strings.add('delete');
config.i18n.strings.add('delete_comment_confirmation');

const Comment = ({ d2, comment, showActions, onEdit, onDelete }) => (
    <div>
        <div style={styles.commentText}>
            {comment.text}
        </div>

        <span style={styles.tipText}>
            <FormattedRelative value={comment.created} />
        </span>

        <ActionSeparator labelText="" />

        {showActions &&
            <span>
                <Link label={d2.i18n.getTranslation('edit')} onClick={() => onEdit(comment)} />
                <ActionSeparator />
                <Link label={d2.i18n.getTranslation('delete')} onClick={() => onDelete(comment)} />
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
        if (confirm(this.context.d2.i18n.getTranslation('delete_comment_confirmation'))) {
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
                                        d2={d2}
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
