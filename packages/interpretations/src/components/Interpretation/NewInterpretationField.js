import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import MentionsWrapper from '@dhis2/d2-ui-mentions-wrapper';
import { Editor as RichTextEditor, convertCtrlKey } from '@dhis2/d2-ui-rich-text';
import i18n from '@dhis2/d2-i18n';
import WithAvatar from '../Avatar/WithAvatar';
import Toolbar from '../Toolbar/Toolbar';
import SharingInfo from '../SharingInfo/SharingInfo';
import InterpretationModel from '../../models/interpretation';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import styles from './styles/NewInterpretationField.style';

export class NewInterpretationField extends Component {
    constructor(props) {
        super(props);
        this.textarea = React.createRef();
        this.id = Math.random().toString(36);
        this.state = { 
            text: this.props.interpretation ? this.props.interpretation.text : '',
            showToolbar: false,
        };    
    };

    onInputChange = event => {
        if (event.target) {
            this.setState({ text: event.target.value });
        }
    };

    setNativeInputVal = val => {
        const node = this.textarea.current;
        node.value = val;
    };

    onKeyDown = event => {
        convertCtrlKey(event, this.setNativeInputVal)
        this.setState({ text: this.textarea.current.value });
    };

    onClearInput = () => 
        this.setState({ text: '' }, () => this.textarea.current.focus());
        
    onFocus = () => 
        this.setState({ showToolbar: true });
    
    onBlur = () => 
        !this.state.text.length  && this.setState({ showToolbar: false })
        
    onToolbarClick = (text, highlightStart, highlightEnd) => 
        this.setState({ text }, () => this.focus(highlightStart, highlightEnd));

    async postInterpretation() {
        const newInterpretation = new InterpretationModel(this.props.model, {});
        newInterpretation.text = this.state.text;
        return newInterpretation.save(this.context.d2);
    };

    onPost = () => 
        this.postInterpretation().then(savedInterpretation => {
            this.props.onSave(savedInterpretation);
            this.setState({ text: '' }, this.onBlur);
        });

    onUpdate = () => {
        this.props.interpretation.text = this.state.text;
        this.props.onUpdate(this.props.interpretation);
    };

    focus = (highlightStart, highlightEnd) => {
        this.textarea.current.focus();
        this.textarea.current.setSelectionRange(highlightStart, highlightEnd)

    };

    renderActionButtons = () => {
        if (this.state.text.length) {
            return (
                <Fragment>
                    <Button 
                        className={this.props.classes.saveButton} 
                        color="primary" 
                        variant="contained" 
                        onClick={this.props.interpretation ? this.onUpdate : this.onPost}
                    >
                        {i18n.t('Save interpretation')}
                    </Button>
                    <Button
                        className={this.props.classes.cancelButton}  
                        variant="outlined" 
                        onClick={this.props.onClose || this.onClearInput}
                    >
                        {i18n.t('Cancel')}
                    </Button>
                </Fragment>
            );
        } else if (this.props.interpretation) {
            return (
                <Button
                    className={this.props.classes.cancelButton}  
                    variant="outlined" 
                    onClick={this.props.onClose}
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

    renderSharingInfo = () =>
        !!this.state.text && (
            <SharingInfo interpretation={this.props.interpretation || this.props.model} />
        );
    
    render() {
        const ActionButtons = this.renderActionButtons();
        const Toolbar = this.renderToolbar();
        const Sharing = this.renderSharingInfo();

        return (
            <WithAvatar className={this.props.classes.newInterpretation} user={this.context.d2.currentUser}>
                <MentionsWrapper d2={this.context.d2} onUserSelect={this.onInputChange}>
                    <RichTextEditor onEdit={this.onInputChange}>
                        <ClickAwayListener mouseEvent="onClick" onClickAway={this.onBlur}>
                            <div className={this.props.classes.inputField} onFocus={this.onFocus}>
                                {Toolbar}
                                    <textarea
                                        className={this.props.classes.textArea}
                                        id={this.id}
                                        ref={this.textarea}
                                        value={this.state.text}
                                        placeholder={i18n.t('Write an interpretation')}
                                        rows={this.state.showToolbar || this.state.text.length ? 4 : 2}
                                        onChange={this.onInputChange}
                                        onKeyDown={this.onKeyDown}
                                    />
                            </div>
                        </ClickAwayListener>
                    </RichTextEditor>
                </MentionsWrapper>
                {Sharing}
                {ActionButtons}
            </WithAvatar>
        );
    };
};

NewInterpretationField.contextTypes = {
    d2: PropTypes.object.isRequired,
};

NewInterpretationField.propTypes = {
    classes: PropTypes.object.isRequired,
    model: PropTypes.object.isRequired,
    interpretation: PropTypes.object,
    onSave: PropTypes.func,
    onUpdate: PropTypes.func,
    onClose: PropTypes.func
};

export default withStyles(styles)(NewInterpretationField);
