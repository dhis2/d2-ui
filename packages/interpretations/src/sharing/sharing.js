import isEqual from 'lodash/isEqual';

export const shouldUpdateSharing = (sharingInfo, interpretation) => {
    const externalAccess = !isEqual(sharingInfo.externalAccess, interpretation.externalAccess);
    const publicAccess = !isEqual(sharingInfo.publicAccess, interpretation.publicAccess);
    const userAccesses = !isEqual(sharingInfo.userAccesses || [], interpretation.userAccesses);
    const userGroupAccesses = !isEqual(sharingInfo.userGroupAccesses || [], interpretation.userGroupAccesses);

    return externalAccess || publicAccess || userAccesses || userGroupAccesses;
};
