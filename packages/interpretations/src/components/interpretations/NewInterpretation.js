import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import i18n from '@dhis2/d2-i18n';
import MentionsWrapper from '@dhis2/d2-ui-mentions-wrapper';
import SharingDialog from '@dhis2/d2-ui-sharing-dialog';
import { WithAvatar, Link, ActionSeparator } from './misc';
import styles from './styles/NewInterpretation.style';

export class NewInterpretation extends Component {
    state = { 
        text: this.props.newInterpretation.text,
        sharingDialogIsOpen: false,
        savedInterpretation: null, 
    };

    onInputChange = event => this.setState({ text: event.target.value });

    onPost = () => 
        this._saveInterpretation().then(savedInterpretation => {
            this.props.onSave(savedInterpretation);
            this.props.onClose();
        });

    _saveInterpretation() {
        this.props.newInterpretation.text = this.state.text;
        return this.props.newInterpretation.save();
    }

    onPostAndShare = () =>
        this._saveInterpretation().then(savedInterpretation => {
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
                <WithAvatar 
                    style={styles.newInterpretationSection} 
                    user={this.context.d2.currentUser}
                >
                    <MentionsWrapper 
                        d2={this.context.d2} 
                        onUserSelect={this.onInputChange}
                        >
                        <textarea
                            className={this.props.classes.textArea}
                            value={this.state.text}
                            rows={4}
                            autoFocus={true}
                            onChange={this.onInputChange}
                            />
                    </MentionsWrapper>
                    <Link 
                        disabled={!this.state.text} 
                        label={i18n.t('Post')} 
                        onClick={this.onPost} 
                    />
                    <ActionSeparator />
                    <Link 
                        disabled={!this.state.text} 
                        label={i18n.t('Post & Share')} 
                        onClick={this.onPostAndShare} 
                    />
                    <ActionSeparator />
                    <Link 
                        label={i18n.t('Cancel')} 
                        onClick={this.onCancel} 
                    />
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
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default withStyles(styles)(NewInterpretation);