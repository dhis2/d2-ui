import React from 'react';

import CircularProgress from 'material-ui/lib/circular-progress';
import TextField from 'material-ui/lib/text-field';

import Translate from '../i18n/Translate.mixin';
import LocaleSelector from '../i18n/LocaleSelector.component';

import actions from './translationForm.actions';
import store from './translation.store';

function getLoadingdataElement() {
    return (
        <div style={{textAlign: 'center'}}>
            <CircularProgress mode="indeterminate"/>
        </div>
    );
}

function getClassName(modelDefinition) {
    return modelDefinition.javaClass.split('.').pop();
}

export default React.createClass({
    mixins: [Translate],

    getInitialState() {
        return {
            loading: true,
            translations: {},
            translationValues: {},
        };
    },

    componentDidMount() {
        actions.loadLocales();

        store.subscribe((storeState) => {
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

    renderForm() {
        return (
            <div>
                <div>
                    <TextField floatingLabelText={this.getTranslation('name')}
                               value={this.state.translationValues.name}
                               fullWidth
                               onChange={this._setValue.bind(this, 'name')}
                               onBlur={this._saveValue.bind(this, 'name')}
                    />
                </div>
                <div>
                    <TextField floatingLabelText={this.getTranslation('short_name')}
                               value={this.state.translationValues.shortName}
                               fullWidth
                               onChange={this._setValue.bind(this, 'shortName')}
                               onBlur={this._saveValue.bind(this, 'shortName')}
                    />
                </div>
                <div>
                    <TextField floatingLabelText={this.getTranslation('description')}
                               multiLine={true}
                               value={this.state.translationValues.description}
                               fullWidth
                               onChange={this._setValue.bind(this, 'description')}
                               onBlur={this._saveValue.bind(this, 'description')}
                    />
                </div>
            </div>
        );
    },

    render() {
        if (this.state.loading) {
            return getLoadingdataElement();
        }

        return (
            <div style={{height: 400}}>
                {getClassName(this.props.objectTypeToTranslate)}
                <LocaleSelector locales={this.state.availableLocales} onChange={this._reloadTranslations} />
                {this.state.isLocaleSelected ? this.renderForm() : null}
            </div>
        );
    },

    _reloadTranslations(locale) {
        actions.loadTranslationsForObject(this.props.objectIdToTranslate, locale);
        this.setState({
            isLocaleSelected: true,
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
        const model = this.state.translations.find((translation) => {
            return translation.property === property;
        });

        if (model) {
            // Update existing translation
            if (model.value !== event.target.value) {
                model.value = event.target.value;

                model.save();
            }
        } else {
            console.log('Create a model!');
        }
    },
});
