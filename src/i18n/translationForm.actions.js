import Action from '../action/Action';
import {getInstance as getD2} from 'd2/lib/d2';

import translationStore from './translation.store';

function loadAvailableLocales() {
    if (!loadAvailableLocales.localePromise) {
        loadAvailableLocales.localePromise = getD2()
            .then(d2 => {
                const api = d2.Api.getApi();

                return api.get('locales/ui');
            });
    }

    return loadAvailableLocales.localePromise;
}

function getClassName(modelDefinition) {
    return modelDefinition.javaClass.split('.').pop();
}

const actions = Action.createActionsFromNames([
    'loadTranslationsForObject',
    'loadLocales',
    'saveTranslation',
]);

actions.loadLocales
    .subscribe(() => {
        loadAvailableLocales()
            .then(availableLocales => {
                translationStore.setState({
                    availableLocales,
                });
            });
    });

actions.loadTranslationsForObject
    .subscribe(({data: [objectId, locale], complete, error}) => {
        getD2()
            .then(d2 => {
                return d2.models.translation
                    .filter().on('objectId').equals(objectId)
                    .filter().on('locale').equals(locale)
                    .list({fields: 'href,id,property,value,className,locale', paging: false})
                    .then((translationCollection) => translationCollection.toArray());
            })
            .then(translations => {
                translationStore.setState({
                    ...translationStore.state,
                    translations,
                });
            })
            .then(complete)
            .catch(error);
    });

actions.saveTranslation
    .subscribe(({data: [property, value, objectId, modelDefinition, locale], complete, error}) => {
        const model = translationStore.state.translations.find((translation) => {
            return translation.property === property;
        });

        if (model) {
            // Update existing translation
            if (model.value !== value) {
                model.value = value;

                model.save()
                    .then(complete)
                    .catch(error);
            }
        } else {
            if (!value) { return; }

            // Create new translation
            getD2()
                .then(d2 => d2.models.translation)
                .then(translation => translation.create())
                .then(translationModel => {
                    translationModel.className = getClassName(modelDefinition);
                    translationModel.locale = locale;
                    translationModel.value = value;
                    translationModel.property = property;
                    translationModel.objectId = objectId;

                    return translationModel.save();
                })
                .then(complete)
                .catch(error);
        }
    });


export default actions;
