import Action from 'd2-flux/action/Action';
import sharingStore from './sharing.store';

const actions = Action.createActionsFromNames([
    'externalAccessChanged',
    'loadObjectSharingState',
    'publicAccessChanged',
]);

actions.externalAccessChanged
    .subscribe(({data}) => {
        sharingStore.setState(Object.assign({}, sharingStore.getState(), {externalAccess: data}));
    });

actions.loadObjectSharingState
    .subscribe(({data: sharableObject}) => {
        const sharableState = {
            externalAccess: sharableObject.externalAccess,
        };

        sharingStore.setState(sharableState);
    });

actions.publicAccessChanged
    .subscribe(({data: publicAccess}) => {
        sharingStore.setState(Object.assign({}, sharingStore.getState(), {publicAccess}));
    });

export default actions;
