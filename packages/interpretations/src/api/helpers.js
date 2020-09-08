import Interpretation from '../models/interpretation';
import { apiFetch } from './api';
import { itemTypeMap } from './redirect';

const interpretationsFields = [
    'id',
    'user[id,displayName,userCredentials[username]]',
    'created',
    'lastUpdated',
    'likes',
    'likedBy[id,displayName]',
    'text',
    'publicAccess',
    'externalAccess',
    'userAccesses',
    'userGroupAccesses',
    'comments[id,text,created,lastUpdated,user[id,displayName,userCredentials[username]]]',
];

const favoriteFields = [
    'id',
    'name',
    'href',
    'subscribed',
    'user[id,displayName]',
    'displayName',
    'description',
    'displayDescription',
    'created',
    'lastUpdated',
    'access',
    'publicAccess',
    'externalAccess',
    'userAccesses',
    'userGroupAccesses',
    `interpretations[${interpretationsFields.join(',')}]`,
];

export const getFavoriteWithInterpretations = (d2, type, id) => {
    const propName = itemTypeMap[type.toUpperCase()].propName;
    const modelClass = d2.models[propName];
    const api = d2.Api.getApi();
    const model$ = modelClass.get(id, {fields: favoriteFields.join(',')});
    const views$ = api.get(`dataStatistics/favorites/${id}`).then(json => json.views);

    return Promise.all([model$, views$])
        .then(([model, views]) => {
            const modelInterpretations = model.interpretations
                .map(attrs => new Interpretation(model, attrs));

            return Object.assign(model, {
                interpretations: modelInterpretations,
                favoriteViews: views,
                modelName: type,
            });
        });
};

export const setSubscription = async (d2, model, newSubscriptionValue) => {
    if (!model || !model.href) {
        return Promise.reject(new Error(`Attribute href not found in model`));
    } else {
        const path = `${model.href}/subscriber`;
        const method = newSubscriptionValue ? "POST" : "DELETE";
        return await apiFetch(d2, path, method);
    }
};
