export function cachedAccessTypeToString(canView, canEdit) {
    if (canView) {
        return canEdit
            ? 'rw------'
            : 'r-------';
    }

    return '--------';
}

export function transformAccessObject(access, type) {
    return {
        id: access.id,
        name: access.name,
        displayName: access.displayName,
        type,
        canView: access.access && access.access.includes('r'),
        canEdit: access.access && access.access.includes('rw'),
    };
}

export function transformObjectStructure(apiMeta, apiObject) {
    const userGroupAccesses = !apiObject.userGroupAccesses ? [] : apiObject.userGroupAccesses.map(
        access => transformAccessObject(access, 'userGroup'));

    const userAccesses = !apiObject.userAccesses ? [] : apiObject.userAccesses.map(
        access => transformAccessObject(access, 'user'));

    const combinedAccesses = userGroupAccesses.concat(userAccesses);
    const authorOfSharableItem = apiObject.user && {
        id: apiObject.user.id,
        name: apiObject.user.name,
    };

    return {
        authorOfSharableItem,
        nameOfSharableItem: apiObject.name,
        canSetPublicAccess: apiMeta.allowPublicAccess,
        canSetExternalAccess: apiMeta.allowExternalAccess,
        publicCanView: apiObject.publicAccess.includes('r'),
        publicCanEdit: apiObject.publicAccess.includes('rw'),
        isSharedExternally: apiObject.externalAccess,
        accesses: combinedAccesses,
    };
}

export const restoreObjectStructure = (transformedObject, apiObject) => {
    const userAccesses = [];
    const userGroupAccesses = [];

    transformedObject.accesses.forEach((access) => {
        const apiAccess = {
            id: access.id,
            name: access.name,
            displayName: access.name,
            access: cachedAccessTypeToString(access.canView, access.canEdit),
        };

        if (access.type === 'user') {
            userAccesses.push(apiAccess);
        } else {
            userGroupAccesses.push(apiAccess);
        }
    });

    return {
        meta: apiObject.meta,
        object: {
            ...apiObject.object,
            userAccesses,
            userGroupAccesses,

            publicAccess: cachedAccessTypeToString(
                transformedObject.publicCanView,
                transformedObject.publicCanEdit,
            ),
            externalAccess: transformedObject.isSharedExternally,
        },
    };
}