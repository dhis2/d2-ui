import React from 'react';
import PropTypes from 'prop-types'
import { Link, ActionSeparator } from './misc';
import i18n from '@dhis2/d2-i18n'
import styles from './InterpretationsStyles.js';

class CommentTextarea extends React.Component {
    static propTypes = {
        comment: PropTypes.object.isRequired,
        onPost: PropTypes.func.isRequired,
        onCancel: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = { text: props.comment.text || "" };
        this.onPost = this.onPost.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ text: nextProps.comment.text });
    }

    onChange(ev) {
        this.setState({ text: ev.target.value });
    }

    onPost() {
        const newText = this.state.text;
        if (newText && newText.trim()) {
            const newComment = this.props.comment;
            newComment.text = newText;
            this.props.onPost(newComment);
            this.setState({ text: "" });
        }
    }

    render() {
        const { comment, onCancel } = this.props;
        const { text } = this.state;
        const postText = onCancel ? i18n.t("OK") : i18n.t('Post comment');

        return (
            <div>
                <textarea style={styles.commentArea} value={text} rows={4} onChange={ev => this.onChange(ev)} />
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
