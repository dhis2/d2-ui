import i18n from '@dhis2/d2-i18n';

const accessMapping = {
    '--------': i18n.t('None'),
    'r-------': i18n.t('Read'),
    'rw------': i18n.t('Read/Write'),
};

export const getSharingText = model => {
    const publicAccessValue = accessMapping[model.publicAccess] || i18n.t('Unknown');
    const publicAccess = i18n.t('Public') + ': ' + publicAccessValue;

    const userCount = (model.userAccesses || []).length;
    const userInfo =
        userCount > 2
            ? `${userCount} ${i18n.t('Users')}`
            : (model.userAccesses || []).map(users => users.displayName).join(', ');

    const userGroupsCount = (model.userGroupAccesses || []).length;
    const userGroupsInfo =
        userGroupsCount > 2
            ? `${userGroupsCount} ${i18n.t('user groups')}`
            : (model.userGroupAccesses || []).map(userGroup => userGroup.displayName).join(', ');

    return publicAccess + (userInfo ? ` + ${userInfo}` : '') + (userGroupsInfo ? ` + ${userGroupsInfo}` : '');
};
