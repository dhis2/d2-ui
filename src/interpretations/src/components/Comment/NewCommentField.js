import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';
import { Editor as RichTextEditor, convertCtrlKey } from '@dhis2/d2-ui-rich-text';
import MentionsWrapper from '@dhis2/d2-ui-mentions-wrapper';
import i18n from '@dhis2/d2-i18n';
import WithAvatar from '../Avatar/WithAvatar';
import Toolbar from '../Toolbar/Toolbar';
import styles from './styles/NewCommentField.style';

export class NewCommentField extends React.Component {
    constructor(props) {
        super(props);
        this.textarea = React.createRef();
        this.id = Math.random().toString(36);
        this.state = { 
            text: this.props.comment ? this.props.comment.text : '',
            sharingDialogIsOpen: false,
            showToolbar: false,
        };    
    };
    
    componentWillReceiveProps(newProps) {
        if (this.props.comment !== newProps.comment) {
            this.setState({ text: newProps.comment.text }, () => this.textarea.current.focus());
        }
    };

    onInputChange = event => {
        if (event.target) {
            this.setState({ text: event.target.value }, this.onFocus);
        }
    };

    onUserSelect = newValue => {
        this.setState({ text: newValue });
    };

    setNativeInputVal = (val, caretPos) => {
        const node = this.textarea.current;
        node.value = val;
        node.setSelectionRange(caretPos, caretPos)
    };

    onKeyDown = event => {
        convertCtrlKey(event, this.setNativeInputVal)
        this.setState({ text: this.textarea.current.value });
    };

    onClearInput = () => 
        this.setState({ text: '' }, this.onBlur);
        
    onFocus = () =>
        this.setState({ showToolbar: true });
    
    onBlur = () =>
        !this.state.text.length  && this.setState({ showToolbar: false });


    onToolbarClick = (text, highlightStart, highlightEnd) => 
        this.setState({ text }, () => this.focus(highlightStart, highlightEnd));

    onPost = () => {
        const newText = this.state.text;

        if (newText && newText.trim()) {
            const newComment = this.props.comment;
            newComment.text = newText;

            this.props.onPost(newComment);
            this.setState({ text: '' }, this.onBlur);
        }
    };

    focus = (highlightStart, highlightEnd) => {
        this.textarea.current.focus();
        this.textarea.current.setSelectionRange(highlightStart, highlightEnd)
    };

    renderActionButtons = () => {
        if (this.state.text.length) {
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
    };

    renderToolbar = () =>
        (this.state.text.length || this.state.showToolbar) && (
            <Toolbar text={this.state.text} onClick={this.onToolbarClick} element={document.getElementById(this.id)} />
        );

    render() {
        const ActionButtons = this.renderActionButtons();
        const Toolbar = this.renderToolbar();
        
        return (
            <WithAvatar className={this.props.classes.newReply} firstName={this.context.d2.currentUser.firstName} surname={this.context.d2.currentUser.surname}>
                <MentionsWrapper d2={this.context.d2} onUserSelect={this.onUserSelect}>
                    <RichTextEditor onEdit={this.onInputChange}>
                        <ClickAwayListener mouseEvent="onClick" onClickAway={this.onBlur}>
                            <div onClick={this.onFocus} className={this.props.classes.inputField} onFocus={this.onFocus}>
                                {Toolbar}
                                <textarea
                                    className={this.props.classes.commentArea}
                                    id={this.id}
                                    ref={this.textarea}
                                    placeholder={i18n.t('Write a reply')}
                                    value={this.state.text}
                                    rows={this.state.showToolbar ? 4 : 2}
                                    autoFocus={true}
                                    onChange={this.onInputChange}
                                    onKeyDown={this.onKeyDown}
                                /> 
                            </div>
                        </ClickAwayListener>
                    </RichTextEditor>
                </MentionsWrapper>
                {ActionButtons}
            </WithAvatar>
        );
    };
};

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
