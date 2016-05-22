import React from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';
import TextField from 'material-ui/lib/text-field';
import Translate from '../i18n/Translate.mixin';
import LocaleSelector from '../i18n/LocaleSelector.component';
import actions from './translationForm.actions';
import store from './translation.store';
import camelCaseToUnderscores from 'd2-utilizr/lib/camelCaseToUnderscores';


export default React.createClass({
    propTypes: {
        onTranslationSaved: React.PropTypes.func.isRequired,
        onTranslationError: React.PropTypes.func.isRequired,
        objectTypeToTranslate: React.PropTypes.object.isRequired,
        objectToTranslate: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
        }).isRequired,
        fieldsToTranslate: React.PropTypes.arrayOf(React.PropTypes.string),
    },

    mixins: [Translate],

    getInitialState() {
        return {
            loading: true,
            translations: {},
            translationValues: {},
            currentSelectedLocale: '',
        };
    },

    getDefaultProps() {
        return {
            fieldsToTranslate: ['name', 'shortName', 'description'],
        };
    },

    componentDidMount() {
        actions.loadLocales();

        this.disposable = store.subscribe((storeState) => {
            this.setState({
                ...storeState,
                translationValues: (storeState.translations || [])
                    .reduce((acc, translation) => {
                        acc[translation.property] = translation.value;
                        return acc;
                    }, {}),
                loading: false,
            });
        });
    },

    componentWillUnmount() {
        this.disposable && this.disposable.dispose && this.disposable.dispose();
    },

    getLoadingdataElement() {
        return (
            <div style={{textAlign: 'center'}}>
                <CircularProgress mode="indeterminate"/>
            </div>
        );
    },

    renderFieldsToTranslate() {
        return this.props.fieldsToTranslate
            .filter(fieldName => fieldName)
            .map(fieldName => {
                return (
                    <div key={fieldName}>
                        <TextField floatingLabelText={this.getTranslation(camelCaseToUnderscores(fieldName))}
                                   value={this.state.translationValues[fieldName]}
                                   fullWidth
                                   onChange={this._setValue.bind(this, fieldName)}
                                   onBlur={this._saveValue.bind(this, fieldName)}
                        />
                        <div>{this.props.objectToTranslate[fieldName]}</div>
                    </div>
                );
            });
    },

    renderForm() {
        return (
            <div>
                {this.renderFieldsToTranslate()}
            </div>
        );
    },

    renderHelpText() {
        return (
            <div>
                <p>{this.getTranslation('select_a_locale_to_enter_translations_for_that_language')}</p>
            </div>
        );
    },

    render() {
        if (this.state.loading) {
            return this.getLoadingdataElement();
        }

        return (
            <div style={{minHeight: 250}}>
                <LocaleSelector locales={this.state.availableLocales} onChange={this._reloadTranslations} />
                {Boolean(this.state.currentSelectedLocale) ? this.renderForm() : this.renderHelpText()}
            </div>
        );
    },

    _reloadTranslations(locale) {
        actions.loadTranslationsForObject(this.props.objectToTranslate.id, locale);
        this.setState({
            currentSelectedLocale: locale,
        });
    },

    _setValue(property, event) {
        const newTranslations = this.state.translationValues;

        newTranslations[property] = event.target.value;

        this.setState({
            translationValues: newTranslations,
        });
    },

    _saveValue(property, event) {
        actions.saveTranslation(property, event.target.value, this.props.objectToTranslate.id, this.props.objectTypeToTranslate, this.state.currentSelectedLocale)
            .subscribe(this.props.onTranslationSaved, this.props.onTranslationError);
    },
});
