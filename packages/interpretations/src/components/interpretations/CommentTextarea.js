import React from 'react';
import PropTypes from 'prop-types'
import { Link, ActionSeparator } from './misc';
import i18n from '@dhis2/d2-i18n'
import styles from './InterpretationsStyles.js';
import RichEditor from '../html-editor/RichEditor';

class CommentTextarea extends React.Component {
    static propTypes = {
        comment: PropTypes.object.isRequired,
        onPost: PropTypes.func.isRequired,
        onCancel: PropTypes.func,
        mentions: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.state = { text: props.comment.text || "", refresh: new Date() };
        this.onPost = this.onPost.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (this.props.comment !== newProps.comment) {
            this.setState({ text: newProps.comment.text, refresh: new Date() });
        }
    }

    onChange(newText) {
        this.setState({ text: newText });
    }

    onPost() {
        const newText = this.state.text;
        if (newText && newText.trim()) {
            const newComment = this.props.comment;
            newComment.text = newText;
            this.props.onPost(newComment);
            this.setState({ text: "", refresh: new Date().getTime() });
        }
    }

    render() {
        const { comment, onCancel, mentions } = this.props;
        const { text, refresh } = this.state;
        const postText = onCancel ? i18n.t("OK") : i18n.t('Post comment');

        return (
            <div>
                <RichEditor
                    onEditorChange={this.onChange}
                    initialContent={text}
                    refresh={refresh}
                    mentions={mentions}
                />

                <Link disabled={!text} label={postText} onClick={this.onPost} />

                {onCancel &&
                    <span>
                        <ActionSeparator />
                        <Link label={i18n.t('Cancel')} onClick={onCancel} />
                    </span>}
            </div>
        );
    }
};

CommentTextarea.propTypes = {
    comment: PropTypes.object.isRequired,
    onPost: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
};

export default CommentTextarea;
