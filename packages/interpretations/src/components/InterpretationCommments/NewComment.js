import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MentionsWrapper from '@dhis2/d2-ui-mentions-wrapper';
import { Editor as RichTextEditor } from '@dhis2/d2-ui-rich-text';
import i18n from '@dhis2/d2-i18n';
import Link from '../Link/Link';
import ActionSeparator from '../ActionSeparator/ActionSeparator';
import styles from './styles/CommentText.style';

export class NewComment extends React.Component {
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

    renderActionButtons = () => (
        <Fragment>
            <Link 
                disabled={!this.state.text} 
                label={this.props.isEditing ? i18n.t('OK') : i18n.t('Post reply')} 
                onClick={this.onPost} 
            />
            <ActionSeparator />
            <Link label={i18n.t('Cancel')} onClick={this.props.onCancel} />
        </Fragment>
    );

    render() {
        const ActionButtons = this.renderActionButtons();
        
        return (
            <Fragment>
                <MentionsWrapper d2={this.contextd2} onUserSelect={this.onChange}>
                    <RichTextEditor onEdit={this.onInputChange}>
                        <textarea
                            ref={this.setTextareaRef}
                            className={this.props.classes.commentArea}
                            value={this.state.text}
                            rows={4}
                            autoFocus={true}
                            onChange={event => this.onChange(event.target.value)}
                        />
                    </RichTextEditor>
                </MentionsWrapper>

                {ActionButtons}

            </Fragment>
        );
    }
}

NewComment.defaultProps = {
    isEditing: false,
}

NewComment.contextTypes = {
    d2: PropTypes.object,
};

NewComment.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object,
    onPost: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isEditing: PropTypes.bool,
};

export default withStyles(styles)(NewComment);
