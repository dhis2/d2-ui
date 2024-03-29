import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import camelCaseToUnderscores from 'd2-utilizr/lib/camelCaseToUnderscores';
import { Observable } from 'rxjs';
import Store from '@dhis2/d2-ui-core/store/Store';
import CircularProgress from '@material-ui/core/CircularProgress';
import LocaleSelector from './LocaleSelector.component';
import { getLocales, getTranslationsForModel, saveTranslations } from './translationForm.actions';

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
            <CircularProgress />
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


    getTranslationValueFor(fieldName) {
        const translation = this.props.translations
            .find(t =>
                t.locale === this.state.currentSelectedLocale &&
                t.property.toLowerCase() === camelCaseToUnderscores(fieldName),
            );

        return translation ? translation.value : '';
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
            .map((fieldName) => {
                const labelPlaceholder = this.getTranslation(camelCaseToUnderscores(fieldName));
                const val = this.getTranslationValueFor(fieldName);

                return (
                    <div key={fieldName}>
                        <TextField
                            placeholder={labelPlaceholder}
                            label={labelPlaceholder}
                            value={val}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            onChange={this.setValue.bind(this, fieldName)}
                            margin="normal"
                        />
                        <div style={{ color: 'rgba(0,0,0,0.6)' }}>{this.props.objectToTranslate[fieldName]}</div>
                    </div>
                );
            });
    }

    renderActionButtons() {
        return (
            <DialogActions>
                <Button
                    color="primary"
                    onClick={this.props.onCancel}
                >{this.getTranslation('cancel')}</Button>
                {this.props.isOnline ? (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.saveTranslations}
                    >
                        {this.getTranslation("save")}
                    </Button>
                ) : (
                    <Tooltip
                        title={this.getTranslation("Cannot save while offline")}
                        placement="top-start"
                    >
                        <span>
                            <Button
                                style={{ color: "white" }}
                                disabled
                                variant="contained"
                                color="primary"
                            >
                                {this.getTranslation("save")}
                            </Button>
                        </span>
                    </Tooltip>
                )}
            </DialogActions>
        );
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
                        <LocaleSelector
                            classes={{}}
                            currentLocale={this.state.currentSelectedLocale}
                            locales={this.props.locales}
                            onChange={this.setCurrentLocale}
                        />
                        {this.state.currentSelectedLocale ? this.renderFieldsToTranslate() : this.renderHelpText()}
                    </div>
                </DialogContent>
                {this.state.currentSelectedLocale && this.renderActionButtons()}
            </Fragment>
        );
    }
}

TranslationForm.propTypes = {
    onTranslationSaved: PropTypes.func.isRequired,
    onTranslationError: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    objectToTranslate: PropTypes.shape({
        id: PropTypes.string.isRequired,
    }),
    locales: PropTypes.array,
    translations: PropTypes.array,
    setTranslations: PropTypes.func,
    fieldsToTranslate: PropTypes.arrayOf(PropTypes.string),
    isOnline: PropTypes.bool,
};

TranslationForm.defaultProps = {
    fieldsToTranslate: ['name', 'shortName', 'description'],
    locales: [],
    isOnline: true,
};

TranslationForm.contextTypes = {
    d2: PropTypes.object,
};


class WithObservableState extends Component {
    componentDidMount() {
        this.disposable = this.props.stateSource$
            .subscribe(
                state => this.setState(state),
                error => console.error(error),
            );
    }

    componentWillUnmount() {
        this.disposable && this.disposable.unsubscribe && this.disposable.unsubscribe();
    }

    render() {
        return React.cloneElement(React.Children.only(this.props.children), {
            ...this.state,
        });
    }
}

const TranslationFormWithData = ({ model, ...props }) => (
    <WithObservableState stateSource$={getTranslationFormData(model)}>
        <TranslationForm {...props} />
    </WithObservableState>
);

export default TranslationFormWithData;
