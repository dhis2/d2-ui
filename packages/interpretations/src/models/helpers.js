import { apiFetch } from '../util/api';
import Interpretation from './interpretation';
  
const interpretationsFields = [
    'id',
    'user[id,displayName]',
    'created',
    'likes',
    'likedBy[id,displayName]',
    'text',
    'comments[id,text,created,user[id,displayName]]',
];

const favoriteFields = [
    'id',
    'name',
    'href',
    'user[id,displayName]',
    'displayName',
    'description',
    'created',
    'lastUpdated',
    'access',
    'publicAccess',
    'userGroupAccesses',
    `interpretations[${interpretationsFields.join(',')}]`,
];

export const getFavoriteWithInterpretations = (d2, type, id) => {
    const modelClass = d2.models[type];
    const api = d2.Api.getApi();
    const getModel = modelClass.get(id, {fields: favoriteFields.join(',')})
    const getViews = api.get(`dataStatistics/favorites/${id}`).then(json => json.views);

    return Promise.all([getModel, getViews])
        .then(([model, views]) => {
            model.interpretations = model.interpretations
                .map(attrs => new Interpretation(model, attrs));
            model.favoriteViews = views;
            return model;
        });
}