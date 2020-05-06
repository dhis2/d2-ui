import i18n from '@dhis2/d2-i18n';

export const getSharingText = model => {
    const accessMapping = {
        '--------': i18n.t('None'),
        'r-------': i18n.t('Read'),
        'rw------': i18n.t('Read/Write'),
    };

    const accessLevel = accessMapping[model.publicAccess] || i18n.t('Unknown');
    const publicAccess = `${i18n.t('Public')}: ${accessLevel}`;

    const userCount = (model.userAccesses || []).length;
    const userInfo =
        userCount > 2
            ? i18n.t(
                '{{count}} users',
                {
                    count: userCount,
                    defaultValue: '{{count}} user',
                    defaultValue_plural: '{{count}} users'
                })
            : (model.userAccesses || []).map(users => users.displayName).join(', ');

    const userGroupsCount = (model.userGroupAccesses || []).length;
    const userGroupsInfo =
        userGroupsCount > 2
            ? i18n.t(
                '{{count}} user groups',
                {
                    count: userGroupsCount,
                    defaultValue: '{{count}} user group',
                    defaultValue_plural: '{{count}} user groups'
                })
            : (model.userGroupAccesses || []).map(userGroup => userGroup.displayName).join(', ');

    return publicAccess + (userInfo ? ` + ${userInfo}` : '') + (userGroupsInfo ? ` + ${userGroupsInfo}` : '');
};
