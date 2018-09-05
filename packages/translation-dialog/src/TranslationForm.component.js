import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import camelCaseToUnderscores from 'd2-utilizr/lib/camelCaseToUnderscores';
import { Observable } from 'rxjs';
import LocaleSelector from './LocaleSelector.component';
import { getLocales, getTranslationsForModel, saveTranslations } from './translationForm.actions';
import { withStateFrom } from '@dhis2/d2-ui-core';
import { Store } from '@dhis2/d2-ui-core';
import { CircularProgress } from '@dhis2/d2-ui-core';

function getTranslationFormData(model) {
    const translationStore = Store.create();

    getTranslationsForModel(model)
        .subscribe((translations) => {
            translationStore.setState(translations);
        });

    return Observable
        .combineLatest(
            getLocales(),
            translationStore,
            (...data) => Object.assign({
                objectToTranslate: model,
                setTranslations(translations) {
                    translationStore.setState({
                        translations,
                    });
                },
            }, ...data),
        );
}

const LoadingDataElement = () =>
    (
        <div style={{ textAlign: 'center', minHeight: 350 }}>
            <CircularProgress mode="indeterminate" />
        </div>
    );

class TranslationForm extends Component {
    constructor(props, context) {
        super(props, context);

        const i18n = this.context.d2.i18n;
        this.getTranslation = i18n.getTranslation.bind(i18n);
    }

    state = {
        loading: true,
        translations: {},
        translationValues: {},
        currentSelectedLocale: '',
    };

    saveTranslations = () => {
        saveTranslations(this.props.objectToTranslate, this.props.translations)
            .subscribe(
                this.props.onTranslationSaved,
                this.props.onTranslationError,
            );
    }

    renderFieldsToTranslate() {
        return this.props.fieldsToTranslate
            .filter(fieldName => fieldName)
            .map(fieldName => (
                <div key={fieldName}>
                    <TextField
                        placeholder={this.getTranslation(camelCaseToUnderscores(fieldName))}
                        label={this.getTranslationValueFor(fieldName)}
                        value={this.getTranslationValueFor(fieldName)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        onChange={this.setValue.bind(this, fieldName)}
                        margin="normal"
                    />
                    <div style={{ ƒfontSize: '16px', color: 'rgba(0,0,0,0.6)' }}>{this.props.objectToTranslate[fieldName]}</div>
                </div>
            ));
    }

    renderActionButtons() {
        return (
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={this.props.onCancel}
                >{this.getTranslation('cancel')}</Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.saveTranslations}
                >{this.getTranslation('save')}</Button>
            </DialogActions>
        )
    }

    renderHelpText() {
        return (
            <div>
                <p>{this.getTranslation('select_a_locale_to_enter_translations_for_that_language')}</p>
            </div>
        );
    }

    render() {
        if (!this.props.locales && !this.props.translations) {
            return <LoadingDataElement />;
        }

        return (
            <Fragment>
                <DialogContent>
                    <div style={{ minHeight: 350 }}>
                        <LocaleSelector locales={this.props.locales} onChange={this.setCurrentLocale} />
                        {this.state.currentSelectedLocale ? this.renderFieldsToTranslate() : this.renderHelpText()}
                    </div>
                </DialogContent>
                {this.state.currentSelectedLocale && this.renderActionButtons()}
            </Fragment>
        );
    }

    getTranslationValueFor(fieldName) {
        const translation = this.props.translations
            .find(t =>
                t.locale === this.state.currentSelectedLocale &&
                t.property.toLowerCase() === camelCaseToUnderscores(fieldName),
            );

        if (translation) {
            return translation.value;
        }
    }

    setCurrentLocale = (locale) => {
        this.setState({
            currentSelectedLocale: locale,
        });
    }

    setValue = (property, event) => {
        let newTranslations = [].concat(this.props.translations);
        let translation = newTranslations
            .find(t => t.locale === this.state.currentSelectedLocale && t.property.toLowerCase() === camelCaseToUnderscores(property));

        if (translation) {
            if (event.target.value) {
                translation.value = event.target.value;
            } else {
                // Remove translation from the array
                newTranslations = newTranslations.filter(t => t !== translation);
            }
        } else {
            translation = {
                property: camelCaseToUnderscores(property).toUpperCase(),
                locale: this.state.currentSelectedLocale,
                value: event.target.value,
            };

            newTranslations.push(translation);
        }

        this.props.setTranslations(newTranslations);
    }
}

TranslationForm.propTypes = {
    onTranslationSaved: PropTypes.func.isRequired,
    onTranslationError: PropTypes.func.isRequired,
    objectToTranslate: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }),
    fieldsToTranslate: PropTypes.arrayOf(PropTypes.string),
};

TranslationForm.defaultProps = {
    fieldsToTranslate: ['name', 'shortName', 'description'],
};

TranslationForm.contextTypes = {
    d2: PropTypes.object,
};

export function getTranslationFormFor(model) {
    return withStateFrom(getTranslationFormData(model), TranslationForm);
}

export default TranslationForm;
