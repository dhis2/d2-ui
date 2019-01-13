import some from 'lodash/fp/some';

export const userCanManage = (d2, object) => {
    const { currentUser } = d2 || {};

    if (!object || !object.user || !currentUser) {
        return false;
    } else if (object.user.id === currentUser.id) {
        return true;
    } else if (currentUser.authorities.has("ALL")) {
        return true;
    } else {
        return false;
    }
};

export const haveReadAccess = (d2, object) => {
    const { currentUser } = d2 || {};
    
    if (!object || !object.user || !currentUser) {
        return false;
    } else if (currentUser.id === object.user.id) {
        return true;
    } else if (currentUser.authorities.has('ALL')) {
        return true;
    } else if (sharedUserAccess(currentUser.id, object.userAccesses)) {
        return true;
    } else if (sharedUserAccess(currentUser.id, object.userGroupAccesses)) {
        return true;
    } else if (object.publicAccess.includes('r')) {
        return true;
    } else {
        return false;
    }
};

const sharedUserAccess = (userId, users) =>
    some(user => user.id === userId && user.access.includes('r'), users);