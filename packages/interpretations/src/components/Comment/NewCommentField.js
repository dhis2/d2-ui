import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';
import MentionsWrapper from '@dhis2/d2-ui-mentions-wrapper';
import i18n from '@dhis2/d2-i18n';
import WithAvatar from '../Avatar/WithAvatar';
import styles from './styles/NewCommentField.style';

export class NewCommentField extends React.Component {
    constructor(props) {
        super(props);
        this.textarea = React.createRef();
        this.state = { 
            text: this.props.comment ? this.props.comment.text : '',
            sharingDialogIsOpen: false,
            isExpanded: false,
        };    
    }
    
    componentWillReceiveProps(newProps) {
        if (this.props.comment !== newProps.comment) {
            this.setState({ text: newProps.comment.text }, () => this.textarea.current.focus());
        }
    };

    onInputChange = event =>
        this.setState({ text: event.target.value });

    onClearInput = () => 
        this.setState({ text: '' });
        
    onFocus = () => 
        this.setState({ isExpanded: true });
    
    onBlur = () => 
        !this.state.text.length  && this.setState({ isExpanded: false })

    onPost = () => {
        const newText = this.state.text;

        if (newText && newText.trim()) {
            const newComment = this.props.comment;
            newComment.text = newText;

            this.props.onPost(newComment);
            this.setState({ text: '' });
        }
    };

    renderActionButtons = () => {
        if (!!this.state.text) {
            return (
                <Fragment>
                    <Button 
                        className={this.props.classes.saveButton} 
                        color="primary" 
                        variant="contained" 
                        onClick={this.onPost}
                    >
                        {i18n.t('Save reply')}
                    </Button>
                    <Button 
                        className={this.props.classes.cancelButton}
                        variant="outlined" 
                        onClick={this.props.onCancel || this.onClearInput}
                    >
                        {i18n.t('Cancel')}
                    </Button>
                </Fragment>
            );
        } else if (this.props.comment && this.props.comment.id) {
            return (
                <Button
                    className={this.props.classes.cancelButton}  
                    variant="outlined" 
                    onClick={this.props.onCancel}
                >
                    {i18n.t('Cancel')}
                </Button>
            )
        }
    }

    render() {
        const ActionButtons = this.renderActionButtons();
        console.log('render');

        return (
            <WithAvatar className={this.props.classes.newReply} user={this.context.d2.currentUser}>
                <MentionsWrapper d2={this.context.d2} onUserSelect={this.onInputChange}>
                        <ClickAwayListener mouseEvent="onClick" onClickAway={this.onBlur}>
                            <div className={this.props.classes.inputField} onFocus={this.onFocus}>
                                <textarea
                                    ref={this.textarea}
                                    className={this.props.classes.commentArea}
                                    placeholder={i18n.t('Write a reply')}
                                    value={this.state.text}
                                    rows={this.state.isExpanded ? 4 : 2}
                                    autoFocus={true}
                                    onChange={this.onInputChange}
                                /> 
                            </div>
                        </ClickAwayListener>
                </MentionsWrapper>
                {ActionButtons}
            </WithAvatar>
        );
    }
}

NewCommentField.contextTypes = {
    d2: PropTypes.object,
};

NewCommentField.propTypes = {
    classes: PropTypes.object.isRequired,
    comment: PropTypes.object,
    onPost: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
};

export default withStyles(styles)(NewCommentField);
