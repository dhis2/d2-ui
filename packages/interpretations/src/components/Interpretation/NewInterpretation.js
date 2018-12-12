import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MentionsWrapper from '@dhis2/d2-ui-mentions-wrapper';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';
import { Editor as RichTextEditor } from '@dhis2/d2-ui-rich-text';
import i18n from '@dhis2/d2-i18n';
import WithAvatar from '../Avatar/WithAvatar';
import Link from '../Link/Link';
import ActionSeparator from '../ActionSeparator/ActionSeparator';
import styles from './styles/NewInterpretation.style';

export class NewInterpretation extends Component {
    state = { 
        text: this.props.newInterpretation.text,
        sharingDialogIsOpen: false,
        savedInterpretation: null, 
    };

    onInputChange = event => this.setState({ text: event.target.value });

    onPost = () => 
        this.postInterpretation().then(savedInterpretation => {
            this.props.onSave(savedInterpretation);
            this.props.onClose();
        });

    async postInterpretation() {
        this.props.newInterpretation.text = this.state.text;
        return this.props.newInterpretation.save(this.context.d2);
    }

    onPostAndShare = () =>
        this.postInterpretation().then(savedInterpretation => {
            this.props.onSave(savedInterpretation);
            this.setState({ savedInterpretation, sharingDialogIsOpen: true });
        });

    onCancel = () => this.props.onClose();

    render() {
        return this.state.sharingDialogIsOpen ? (
            <SharingDialog
                open={this.state.sharingDialogIsOpen}
                onRequestClose={this.onCancel}
                d2={this.context.d2}
                id={this.state.savedInterpretation.id}
                type={'interpretation'}
            /> 
        ) : (
            <Fragment>
                <WithAvatar style={styles.newInterpretationSection} user={this.context.d2.currentUser}>
                    <MentionsWrapper d2={this.context.d2} onUserSelect={this.onInputChange}>
                        <RichTextEditor onEdit={this.onInputChange}>
                            <textarea
                                className={this.props.classes.textArea}
                                value={this.state.text}
                                rows={4}
                                autoFocus={true}
                                onChange={this.onInputChange}
                            />
                        </RichTextEditor>
                    </MentionsWrapper>
                    <Link disabled={!this.state.text} label={i18n.t('Post')} onClick={this.onPost} />
                    {this.props.isNew && (
                        <Fragment>
                            <ActionSeparator />
                            <Link  disabled={!this.state.text} label={i18n.t('Post & Share')} onClick={this.onPostAndShare} />
                        </Fragment>
                    )}
                    <ActionSeparator />
                    <Link label={i18n.t('Cancel')} onClick={this.onCancel} />
                </WithAvatar>
            </Fragment>
        );
    };
};

NewInterpretation.contextTypes = {
    d2: PropTypes.object.isRequired,
};

NewInterpretation.propTypes = {
    classes: PropTypes.object.isRequired,
    model: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    isNew: PropTypes.bool.isRequired,
};

export default withStyles(styles)(NewInterpretation);
