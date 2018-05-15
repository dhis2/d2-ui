import React from 'react';
import PropTypes from 'prop-types'
import { Link, ActionSeparator } from './misc';
import { config } from 'd2/lib/d2';
import styles from './InterpretationsStyles.js';

config.i18n.strings.add('post_comment');
config.i18n.strings.add('ok');
config.i18n.strings.add('cancel');

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
        const newComment = this.props.comment;
        newComment.text = this.state.text;
        this.props.onPost(newComment);
        this.setState({ text: "" });
    }

    render() {
        const { d2 } = this.context;
        const { comment, onCancel } = this.props;
        const { text } = this.state;
        const postText = onCancel ? d2.i18n.getTranslation("ok") : d2.i18n.getTranslation('post_comment');

        return (
            <div>
                <textarea style={styles.commentArea} value={text} rows={4} onChange={ev => this.onChange(ev)} />
                <Link disabled={!text} label={postText} onClick={this.onPost} />
                {onCancel &&
                    <span>
                        <ActionSeparator />
                        <Link label={d2.i18n.getTranslation('cancel')} onClick={onCancel} />
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

CommentTextarea.contextTypes = {
    d2: PropTypes.object.isRequired,
};

export default CommentTextarea;
