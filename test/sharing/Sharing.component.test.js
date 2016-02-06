import React from 'react/addons';
import {getStubContext} from '../../config/inject-theme';
import Sharing from '../../src/sharing/Sharing.component';
import Heading from '../../src/headings/Heading.component';
import CreatedBy from '../../src/sharing/CreatedBy.component';
import PublicAccess from '../../src/sharing/PublicAccess.component';
import LoadingMask from '../../src/loading-mask/LoadingMask.component';
import sharingStore from '../../src/sharing/sharing.store';
import UserGroupAccesses from '../../src/sharing/UserGroupAccesses.component';
import AutoComplete from '../../src/auto-complete/AutoComplete.component';
import ExternalAccess from '../../src/sharing/ExternalAccess.component';
import actions from '../../src/sharing/sharing.actions';
import log from 'loglevel';

import {shallow} from 'enzyme';

describe('Sharing: Sharing component', () => {
    let sharingComponent;
    let objectToShareModelDefinition;

    const renderComponent = (props = {}) => {
        sharingComponent = shallow(<Sharing {...props} />, {
            context: getStubContext(),
        });

        return sharingComponent;
    };

    beforeEach(() => {
        objectToShareModelDefinition = {
            name: 'dataElement',
        };
    });

    describe('loadingMask', () => {
        beforeEach(() => {
            spy(log, 'error');
        });

        afterEach(() => {
            actions.loadObjectSharingState.subscribe.restore && actions.loadObjectSharingState.subscribe.restore();
            log.error.restore();
        });

        it('should render a LoadingMask', () => {
            renderComponent({objectToShare: {id: 'Ql6Gew7eaX6', name: 'Facility Funding Agency', modelDefinition: objectToShareModelDefinition}});

            expect(sharingComponent.find(LoadingMask)).to.have.length(1);
        });

        it('should call log.error when the store emits an error', () => {
            stub(actions, 'loadObjectSharingState')
                .returns({
                    subscribe: stub().callsArgOnWith(1, sharingComponent, new Error('Unable to get store data'))
                });

            renderComponent({objectToShare: {id: 'Ql6Gew7eaX6', name: 'Facility Funding Agency', modelDefinition: objectToShareModelDefinition}});



            expect(log.error).to.be.calledWith('Unable to get store data');
        });
    });

    describe('sharing component', () => {
        beforeEach(() => {
            const mockStoreState = {
                name: 'Facility Funding Agency',
                externalAccess: true,
                publicAccess: 'r-------',
                user: {
                    name: 'Tom Wakiki',
                },
                userGroupAccesses: [
                    {id: 'wl5cDMuUhmF', name: 'Administrators', access: 'rw------'},
                    {id: 'lFHP5lLkzVr', name: 'System administrators', access: 'rw------'},
                ],
                meta: {
                    allowExternalAccess: false,
                    allowPublicAccess: true,
                },
            };

            stub(sharingStore, 'subscribe').callsArgOnWith(0, sharingComponent, mockStoreState);

            spy(actions, 'userGroupAcessesChanged');
        });

        afterEach(() => {
            sharingStore.subscribe.restore()
            actions.userGroupAcessesChanged.restore();
        });

        it('should render the title of the component as a Heading', () => {
            renderComponent({objectToShare: {id: 'Ql6Gew7eaX6', name: 'Facility Funding Agency', modelDefinition: objectToShareModelDefinition}});

            const headerComponent = sharingComponent.find(Heading);

            expect(headerComponent.props().text).to.equal('Facility Funding Agency');
            expect(headerComponent.props().level).to.equal(2);
        });

        it('should render the CreatedBy component with the user part of the objectToShare', () => {
            const objectToShare = {
                name: 'Facility Funding Agency',
                modelDefinition: objectToShareModelDefinition,
            };
            renderComponent({objectToShare});

            const createdByComponent = sharingComponent.find(CreatedBy);

            expect(createdByComponent.props().user).to.deep.equal({name: 'Tom Wakiki'});
        });

        it('should pass the publicAccess property to the PublicAccess component', () => {
            const objectToShare = {
                name: 'Facility Funding Agency',
                publicAccess: 'r-------',
                modelDefinition: objectToShareModelDefinition,
            };
            renderComponent({objectToShare});

            const publicAccessComponent = sharingComponent.find(PublicAccess);

            expect(publicAccessComponent.props().publicAccess).to.equal(objectToShare.publicAccess);
        });

        it('should set the disabled prop on the PublicAccess component to false', () => {
            const objectToShare = {
                name: 'Facility Funding Agency',
                modelDefinition: objectToShareModelDefinition,
            };
            renderComponent({objectToShare});

            const publicAccessComponent = sharingComponent.find(PublicAccess);

            expect(publicAccessComponent.props().disabled).to.be.false;
        });

        it('should set the disabled prop on the ExternalAccess component to true', () => {
            const objectToShare = {
                name: 'Facility Funding Agency',
                modelDefinition: objectToShareModelDefinition,
            };
            renderComponent({objectToShare});

            const externalAccessComponent = sharingComponent.find(ExternalAccess);

            expect(externalAccessComponent.props().disabled).to.be.true;
        });

        it('should pass the userGroupAccesses to the UserGroupAccesses component', () => {
            const expectedUserGroupAccesses = [
                {id: 'wl5cDMuUhmF', name: 'Administrators', access: 'rw------'},
                {id: 'lFHP5lLkzVr', name: 'System administrators', access: 'rw------'},
            ];

            const objectToShare = {
                name: 'Facility Funding Agency',
                modelDefinition: objectToShareModelDefinition,
            };
            renderComponent({objectToShare});

            const userGroupAccesses = sharingComponent.find(UserGroupAccesses);

            expect(userGroupAccesses.props().userGroupAccesses).to.deep.equal(expectedUserGroupAccesses);
        });

        it('should render the AutoComplete for searching userGroups', () => {
            renderComponent({objectToShare: {id: 'Ql6Gew7eaX6', name: 'Facility Funding Agency', modelDefinition: objectToShareModelDefinition}});

            expect(sharingComponent.find(AutoComplete)).to.have.length(1);
        });

        it('should set the type of the autoComplete to be userGroup', () => {
            const objectToShare = {
                name: 'Facility Funding Agency',
                modelDefinition: objectToShareModelDefinition,
            };
            renderComponent({objectToShare});

            const autoCompleteComponent = sharingComponent.find(AutoComplete);

            expect(autoCompleteComponent.props().forType).to.deep.equal('userGroup');
        });

        describe('actions', () => {
            beforeEach(() => {
                spy(actions, 'loadObjectSharingState');
            });

            afterEach(() => {
                actions.loadObjectSharingState.restore();
            });

            it('should pass add a new userGroupAccesses when addUserGroup is called', () => {
                const objectToShare = {
                    name: 'Facility Funding Agency',
                    modelDefinition: objectToShareModelDefinition,
                };
                renderComponent({objectToShare});

                sharingComponent.instance().addUserGroup({id: 'dl5cDMuUhmF', name: 'AFG'});
                sharingComponent.update();

                expect(actions.userGroupAcessesChanged).to.have.been.calledWith([
                    {id: 'wl5cDMuUhmF', name: 'Administrators', access: 'rw------'},
                    {id: 'lFHP5lLkzVr', name: 'System administrators', access: 'rw------'},
                    {id: 'dl5cDMuUhmF', name: 'AFG'},
                ]);
            });

            it('should call loadObjectSharingState when new props are received', () => {
                const objectToShare = {
                    id: 'Ql6Gew7eaX6',
                    name: 'Facility Funding Agency',
                    modelDefinition: objectToShareModelDefinition,
                };

                renderComponent({objectToShare});

                sharingComponent.setProps({objectToShare});

                expect(actions.loadObjectSharingState).to.be.calledWith({
                    id: 'Ql6Gew7eaX6',
                    name: 'Facility Funding Agency',
                    modelDefinition: objectToShareModelDefinition,
                });
            });
        });

        it('should pass the addUserGroup method to the autocomplete box', () => {
            const objectToShare = {
                name: 'Facility Funding Agency',
                modelDefinition: objectToShareModelDefinition,
            };
            renderComponent({objectToShare});

            const autoCompleteComponent = sharingComponent.find(AutoComplete);

            expect(autoCompleteComponent.props().onSuggestionClicked).to.equal(sharingComponent.instance().addUserGroup);
        });

        it('should filter the results for the autoComplete, accepting only objects with ids that are not already in the list', () => {
            const autoCompleteComponent = sharingComponent.find(AutoComplete);

            expect(autoCompleteComponent.props().filterForSuggestions({id: 'lFHP5lLkzVr'})).to.be.false;
            expect(autoCompleteComponent.props().filterForSuggestions({id: 'DCHP5lLkzVc'})).to.be.true;
            expect(autoCompleteComponent.props().filterForSuggestions()).to.be.true;
        });

        it('should pass the externalAccess value as false when the user can not set external access', () => {
            const externalAccess = sharingComponent.find(ExternalAccess);

            expect(externalAccess.props().externalAccess).to.be.false;
        });

        it('should pass the correct externalAccess to the ExternalAccess component', () => {
            sharingComponent.setState({
                objectToShare: {
                    meta: {
                        allowExternalAccess: true,
                    },
                    externalAccess: true,
                },
            });

            const externalAccess = sharingComponent.find(ExternalAccess);

            expect(externalAccess.props().externalAccess).to.be.true;
        });

        it('should pass disabled to ExternalAccess if the user can not set externalAccess', () => {
            sharingComponent.setState({
                objectToShare: {
                    meta: {
                        allowExternalAccess: false,
                    },
                    externalAccess: true,
                },
            });

            const externalAccess = sharingComponent.find(ExternalAccess);

            expect(externalAccess.props().disabled).to.be.true;
            // TODO: Is it true that the user should not be able to see externalAccess when he/she can not set it?
            // expect(externalAccess.props().externalAccess).to.be.true;
        });

        it('should pass the new userGroupAccesses to the userGroupAcessesChanged action', () => {
            const userGroupAccesses = [];
            const userGroupAcesses = sharingComponent.find(UserGroupAccesses);

            userGroupAcesses.simulate('change', userGroupAccesses);

            expect(actions.userGroupAcessesChanged).to.be.calledWith(userGroupAccesses);
        });
    });
});
