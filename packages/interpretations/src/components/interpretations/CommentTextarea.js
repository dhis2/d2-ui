import React from 'react';
import PropTypes from 'prop-types';
import { Link, ActionSeparator } from './misc';
import i18n from '@dhis2/d2-i18n';
import styles from './InterpretationsStyles.js';

import MentionsWrapper from '@dhis2/d2-ui-mentions-wrapper';

class CommentTextarea extends React.Component {
    state = {
        text: this.props.comment.text || '',
    };

    componentWillReceiveProps(newProps) {
        if (this.props.comment !== newProps.comment) {
            this.setState({ text: newProps.comment.text }, this.focus);
        }
    }

    focus = () => {
        const { textarea } = this;
        if (textarea) {
            textarea.focus();
            textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        }
    };

    setTextareaRef = textarea => {
        this.textarea = textarea;
        this.focus();
    };

    onChange = text => {
        this.setState({ text });
    };

    onPost = () => {
        const newText = this.state.text;
        if (newText && newText.trim()) {
            const newComment = this.props.comment;
            newComment.text = newText;
            this.props.onPost(newComment);
            this.setState({ text: '' });
        }
    };

    render() {
        const { comment, onCancel } = this.props;
        const { d2 } = this.context;
        const { text } = this.state;
        const postText = onCancel ? i18n.t('OK') : i18n.t('Post comment');

        return (
            <div>
                <MentionsWrapper d2={d2} onUserSelect={this.onChange}>
                    <textarea
                        ref={this.setTextareaRef}
                        style={styles.commentArea}
                        value={text}
                        rows={4}
                        autoFocus={true}
                        onChange={event => this.onChange(event.target.value)}
                    />
                </MentionsWrapper>

                <Link disabled={!text} label={postText} onClick={this.onPost} />

                {onCancel && (
                    <span>
                        <ActionSeparator />
                        <Link label={i18n.t('Cancel')} onClick={onCancel} />
                    </span>
                )}
            </div>
        );
    }
}

CommentTextarea.contextTypes = {
    d2: PropTypes.object,
};

CommentTextarea.propTypes = {
    comment: PropTypes.object.isRequired,
    onPost: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
};

export default CommentTextarea;
