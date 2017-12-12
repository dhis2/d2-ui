export const cachedAccessTypeToString = (canView, canEdit) => {
    if (canView) {
        return canEdit
            ? 'rw------'
            : 'r-------';
    }

    return '--------';
}

export const transformAccessObject = (access, type) => ({
    id: access.id,
    name: access.name,
    displayName: access.displayName,
    type,
    canView: access.access && access.access.includes('r'),
    canEdit: access.access && access.access.includes('rw'),
});

export const accessStringToObject = access => {
    if (!access) {
        return {
            data: { canView: false, canEdit: false },
            meta: { canView: false, canEdit: false },
        };
    }

    const metaAccess = access.substring(0, 2);
    const dataAccess = access.substring(2, 4);

    return {
        meta: {
            canView: metaAccess.includes('r'),
            canEdit: metaAccess.includes('rw'),
        },
        data: {
            canView: dataAccess.includes('r'),
            canEdit: dataAccess.includes('rw'),
        }
    };
}

export const accessObjectToString = accessObject => {
    const convert = ({ canEdit, canView }) => canEdit ? 'rw' : canView ? 'r-' : '--';
    
    let accessString = '';
    accessString += convert(accessObject.meta);
    accessString += convert(accessObject.data);

    return (accessString + '----');
}