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

export const haveReadAccess = (d2, userGroups, object) => {
    const { currentUser } = d2 || {};

    if (!object || !currentUser) {
        return false;
    } else if (object.user && currentUser.id === object.user.id) {
        return true;
    } else if (currentUser.authorities.has('ALL')) {
        return true;
    } else if (object.publicAccess && object.publicAccess.includes('r')) {
        return true;
    } else if (sharedUserAccess(currentUser.id, object.userAccesses, 'r')) {
        return true;
    } else if (sharedUserGroups(userGroups, object.userGroupAccesses, 'r')) {
        return true;
    } else {
        return false;
    }
};

export const haveWriteAccess = (d2, userGroups, object) => {
    const { currentUser } = d2 || {};
    
    if (!object || !currentUser) {
        return false;
    } else if (object.user && currentUser.id === object.user.id) {
        return true;
    } else if (currentUser.authorities.has('ALL')) {
        return true;
    } else if (object.publicAccess.includes('w')) {
        return true;
    } else if (sharedUserAccess(currentUser.id, object.userAccesses, 'w')) {
        return true;
    } else if (sharedUserGroups(userGroups, object.userGroupAccesses, 'w')) {
        return true;
    } else {
        return false;
    }
};


const sharedUserAccess = (userId, users, accessBit) =>
    some(user => user.id === userId && user.access.includes(accessBit), users);

const sharedUserGroups = (userGroups, objectGroups, accessBit) => {
    let isMember = false;

    userGroups.forEach(id => {
        if(some(objectGroup => 
                objectGroup.id === id && 
                objectGroup.access.includes(accessBit), objectGroups
            )) {
                isMember = true;
            }
    })

    return isMember;
};

