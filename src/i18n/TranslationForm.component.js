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

function findTranslationFor(property, array) {
    const foundTranslation = Array.prototype.find.call(array, function (translation) {
        return translation.property === property;
    });

    if (foundTranslation) {
        return foundTranslation;
    }
    return {};
}

export default React.createClass({
    mixins: [Translate],

    getInitialState() {
        return {
            loading: true,
        };
    },

    componentDidMount() {
        actions.loadLocales();

        store.subscribe((storeState) => {
            this.setState({
                ...storeState,
                loading: false,
            });
        });
    },

    renderForm() {
        return (
            <div>
                <div>
                    <TextField floatingLabelText={this.getTranslation('name')}
                               defaultValue={findTranslationFor('name', this.state.translations).value}
                               fullWidth/>
                </div>
                <div>
                    <TextField floatingLabelText={this.getTranslation('short_name')}
                               defaultValue={findTranslationFor('shortName', this.state.translations).value}
                               fullWidth/>
                </div>
                <div>
                    <TextField floatingLabelText={this.getTranslation('description')}
                               multiLine={true}
                               defaultValue={findTranslationFor('description', this.state.translations).value}
                               fullWidth/>
                </div>
            </div>
        );
    },

    render() {
        if (this.state.loading) {
            return getLoadingdataElement();
        }

        return (
            <div>
                <LocaleSelector locales={this.state.availableLocales} onChange={this._reloadTranslations} />
            </div>
        );
    },

    _reloadTranslations(locale) {
        console.log('Reload translations for ', locale);
        actions.loadTranslationsForObject(this.props.objectIdToTranslate);
    },
});
