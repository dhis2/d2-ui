import isEqual from 'lodash/isEqual';

export const shouldUpdateSharing = (sharingInfo, interpretation) => {
    const externalAccess = !isEqual(sharingInfo.externalAccess, interpretation.externalAccess);
    const publicAccess = !isEqual(sharingInfo.publicAccess, interpretation.publicAccess);
    const userAccesses = !isEqual(sharingInfo.userAccesses || [], interpretation.userAccesses);
    const userGroupAccesses = !isEqual(sharingInfo.userGroupAccesses || [], interpretation.userGroupAccesses);

    return externalAccess || publicAccess || userAccesses || userGroupAccesses;
};

export const getSharing = (user, interpretation, model) => ({
    object: {
        user: { id: user.id, name: user.displayName },
        displayName: model.displayName,
        userAccesses: interpretation.userAccesses,
        userGroupAccesses: interpretation.userGroupAccesses,
        publicAccess: interpretation.publicAccess,
        externalAccess: interpretation.externalAccess,
        modelId: model.id,
    },
    meta: {
        allowPublicAccess: model.publicAccess.includes('r'),
        allowExternalAccess: model.externalAccess,
    },
});

export const setInitialSharing = (user, object) => ({
    object: {
        user: { id: user.id, name: user.displayName },
        displayName: object.displayName,
        userAccesses: object.userAccesses.map(obj => Object.assign({}, obj, { access: 'rw------'})),
        userGroupAccesses: object.userGroupAccesses.map(obj => Object.assign({}, obj, { access: 'rw------'})),
        publicAccess: object.publicAccess.includes('r') ? 'rw------' : object.publicAccess,
        externalAccess: object.externalAccess,
        modelId: object.id,
    },
    meta: {
        allowPublicAccess: object.publicAccess.includes('r'),
        allowExternalAccess: object.externalAccess,    
    }
});

