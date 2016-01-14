import Action from 'd2-flux/action/Action';
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

const actions = Action.createActionsFromNames([
    'loadTranslationsForObject',
    'loadLocales',
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
    .subscribe(({data: [objectId, locale]}) => {
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
            });
    });


export default actions;
