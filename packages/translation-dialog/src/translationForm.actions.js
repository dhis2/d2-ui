import { getInstance } from 'd2';
import { Observable } from 'rxjs/Observable';
import Action from '@dhis2/d2-ui-core/build/es/action/Action';

export function getLocales() {
    if (!getLocales.localePromise) {
        getLocales.localePromise = getInstance()
            .then((d2) => {
                const api = d2.Api.getApi();

                return api.get('locales/db');
            })
            .then(locales => ({
                locales,
            }));
    }

    return Observable.fromPromise(getLocales.localePromise);
}

function getModelHref(model) {
    if (model.href) {
        return model.href;
    }

    return `${model.modelDefinition.apiEndpoint}/${model.id}`;
}

export function getTranslationsForModel(model) {
    return Observable.of(model).flatMap((m) => {
        const modelDefinition = m.modelDefinition;

        if (!modelDefinition && !modelDefinition.name) {
            return Promise.reject(new Error(`Can not find modelDefinition for ${m.id}`));
        }

        return getInstance().then((d2) => {
            const api = d2.Api.getApi();

            return api.get(`${getModelHref(m)}/translations`);
        });
    });
}

export const saveTranslations = Action.create('saveTranslations');

saveTranslations.subscribe(({ data: [model, translations], complete, error }) => {
    const translationHref = `${getModelHref(model)}/translations`;

    getInstance().then((d2) => {
        const api = d2.Api.getApi();

        api
            .update(translationHref, { translations }, { dataType: 'text' })
            .then(() => complete(translations))
            .catch(error);
    });
});
