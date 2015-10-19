import Action from 'd2-flux/action/Action';
import sharingStore from './sharing.store';
import {getInstance as getD2} from 'd2/lib/d2';

const actions = Action.createActionsFromNames([
    'externalAccessChanged',
    'loadObjectSharingState',
    'publicAccessChanged',
    'userGroupAcessesChanged',
]);

actions.externalAccessChanged
    .subscribe(({data}) => {
        sharingStore.setState(Object.assign({}, sharingStore.getState(), {externalAccess: data}));
    });

actions.loadObjectSharingState
    .subscribe(({data: sharableObject}) => {
        getD2()
            .then(d2 => {
                const api = d2.Api.getApi();
                const objectType = sharableObject.modelDefinition.name;

                return api.get('sharing', {type: objectType, id: sharableObject.id}, {contentType: 'text/plain'});
            })
            .then(({object}) => {
                const sharableState = {};
                sharableState.externalAccess = object.externalAccess;
                sharableState.publicAccess = object.publicAccess;
                sharableState.userGroupAccesses = object.userGroupAccesses;

                sharingStore.setState(sharableState);
            });
    });

actions.publicAccessChanged
    .subscribe(({data: publicAccess}) => {
        sharingStore.setState(Object.assign({}, sharingStore.getState(), {publicAccess}));
    });

actions.userGroupAcessesChanged
    .subscribe(({data: userGroupAccesses}) => {
        sharingStore.setState(Object.assign({}, sharingStore.getState(), {userGroupAccesses}));
    });

export default actions;
