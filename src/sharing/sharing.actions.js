import Action from 'd2-flux/action/Action';
import sharingStore from './sharing.store';
import {getInstance as getD2} from 'd2/lib/d2';

const actions = Action.createActionsFromNames([
    'externalAccessChanged',
    'loadObjectSharingState',
    'publicAccessChanged',
    'userGroupAcessesChanged',
    'saveChangedState',
]);

actions.externalAccessChanged
    .subscribe(({data}) => {
        sharingStore.setState(Object.assign({}, sharingStore.getState(), {externalAccess: data}));

        actions.saveChangedState();
    });

actions.loadObjectSharingState
    .subscribe(({data: sharableObject}) => {
        const objectType = sharableObject.modelDefinition.name;

        getD2()
            .then(d2 => {
                const api = d2.Api.getApi();

                return api.get('sharing', {type: objectType, id: sharableObject.id}, {contentType: 'text/plain'});
            })
            .then(({meta, object}) => {
                const sharableState = {
                    objectType,
                    meta,
                    user: object.user,
                    externalAccess: object.externalAccess,
                    publicAccess: object.publicAccess,
                    userGroupAccesses: object.userGroupAccesses || [],
                };
                sharableState.model = sharableObject;
                sharableState.isSaving = false;
                sharingStore.setState(sharableState);
            });
    });

actions.publicAccessChanged
    .subscribe(({data: publicAccess}) => {
        sharingStore.setState(Object.assign({}, sharingStore.getState(), {publicAccess}));

        actions.saveChangedState();
    });

actions.userGroupAcessesChanged
    .subscribe(({data: userGroupAccesses}) => {
        sharingStore.setState(Object.assign({}, sharingStore.getState(), {userGroupAccesses}));

        actions.saveChangedState();
    });

function saveSharingToServer(action) {
    return getD2()
        .then((d2) => {
            const api = d2.Api.getApi();
            const {
                meta,
                model,
                externalAccess,
                publicAccess,
                userGroupAccesses,
                objectType,
            } = sharingStore.getState();

            const sharingDataToPost = {
                meta,
                object: {
                    externalAccess,
                    publicAccess,
                    userGroupAccesses: userGroupAccesses.filter(userGroupAccess => {
                        if (userGroupAccess.access !== '--------') {
                            return true;
                        }
                        return false;
                    }),
                },
            };

            return api.post(`sharing?type=${objectType}&id=${model.id}`, sharingDataToPost)
                .then(({httpStatus, message}) => {
                    if (httpStatus === 'OK') {
                        action.complete(message);
                    } else {
                        action.error(message);
                    }
                    return message;
                })
                .catch(({message}) => {
                    action.error(message);
                    return message;
                });
        });
}

actions.saveChangedState
    .debounce(500)
    .map(saveSharingToServer)
    .concatAll()
    .subscribe(() => {
        actions.loadObjectSharingState(sharingStore.getState().model);
    });

export default actions;
