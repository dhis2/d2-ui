import React from 'react/addons';
import injectTheme from '../../config/inject-theme';
import Sharing from '../../src/sharing/Sharing.component';
import Heading from '../../src/headings/Heading.component';
import CreatedBy from '../../src/sharing/CreatedBy.component';
import PublicAccess from '../../src/sharing/PublicAccess.component';
import LoadingMask from '../../src/loading-mask/LoadingMask.component';
import sharingStore from '../../src/sharing/sharing.store';
import UserGroupAccesses from '../../src/sharing/UserGroupAccesses.component';
import AutoComplete from '../../src/auto-complete/AutoComplete.component';
import ExternalAccess from '../../src/sharing/ExternalAccess.component';

const {
    findRenderedComponentWithType,
    renderIntoDocument,
} = React.addons.TestUtils;

xdescribe('Sharing: Sharing component', () => {
    let sharingComponent;
    let objectToShareModelDefinition;

    const renderComponent = (props = {}, fakeStore = true) => {
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

        if (fakeStore) {
            stub(sharingStore, 'subscribe').callsArgOnWith(0, sharingComponent, mockStoreState);
        }

        const SharingWithContext = injectTheme(Sharing);
        const renderedComponents = renderIntoDocument(<SharingWithContext {...props} />);

        sharingComponent = findRenderedComponentWithType(renderedComponents, Sharing);
        return sharingComponent;
    };

    beforeEach(() => {
        objectToShareModelDefinition = {
            name: 'dataElement',
        };
    });

    it('should render a LoadingMask', () => {
        renderComponent({objectToShare: {id: 'Ql6Gew7eaX6', name: 'Facility Funding Agency', modelDefinition: objectToShareModelDefinition}}, false);

        expect(() => findRenderedComponentWithType(sharingComponent, LoadingMask)).not.to.throw();
    });

    it('should render a Sharing element', () => {
        renderComponent({objectToShare: {id: 'Ql6Gew7eaX6', name: 'Facility Funding Agency', modelDefinition: objectToShareModelDefinition}});

        expect(() => findRenderedComponentWithType(sharingComponent, Sharing)).not.to.throw();
    });

    it('should render the title of the component as a Heading', () => {
        renderComponent({objectToShare: {id: 'Ql6Gew7eaX6', name: 'Facility Funding Agency', modelDefinition: objectToShareModelDefinition}});

        const headerComponent = findRenderedComponentWithType(sharingComponent, Heading);

        expect(headerComponent.props.text).to.equal('Facility Funding Agency');
        expect(headerComponent.props.level).to.equal(2);
    });

    it('should render the CreatedBy component with the user part of the objectToShare', () => {
        const objectToShare = {
            name: 'Facility Funding Agency',
            modelDefinition: objectToShareModelDefinition,
        };
        renderComponent({objectToShare});

        const createdByComponent = findRenderedComponentWithType(sharingComponent, CreatedBy);

        expect(createdByComponent.props.user).to.deep.equal({name: 'Tom Wakiki'});
    });

    it('should pass the publicAccess property to the PublicAccess component', () => {
        const objectToShare = {
            name: 'Facility Funding Agency',
            publicAccess: 'r-------',
            modelDefinition: objectToShareModelDefinition,
        };
        renderComponent({objectToShare});

        const publicAccessComponent = findRenderedComponentWithType(sharingComponent, PublicAccess);

        expect(publicAccessComponent.props.publicAccess).to.equal(objectToShare.publicAccess);
    });

    it('should set the disabled prop on the PublicAccess component to false', () => {
        const objectToShare = {
            name: 'Facility Funding Agency',
            modelDefinition: objectToShareModelDefinition,
        };
        renderComponent({objectToShare});

        const publicAccessComponent = findRenderedComponentWithType(sharingComponent, PublicAccess);

        expect(publicAccessComponent.props.disabled).to.be.false;
    });

    it('should set the disabled prop on the ExternalAccess component to true', () => {
        const objectToShare = {
            name: 'Facility Funding Agency',
            modelDefinition: objectToShareModelDefinition,
        };
        renderComponent({objectToShare});

        const externalAccessComponent = findRenderedComponentWithType(sharingComponent, ExternalAccess);

        expect(externalAccessComponent.props.disabled).to.be.true;
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

        const userGroupAccesses = findRenderedComponentWithType(sharingComponent, UserGroupAccesses);

        expect(userGroupAccesses.props.userGroupAccesses).to.deep.equal(expectedUserGroupAccesses);
    });

    it('should render the AutoComplete for searching userGroups', () => {
        renderComponent({objectToShare: {id: 'Ql6Gew7eaX6', name: 'Facility Funding Agency', modelDefinition: objectToShareModelDefinition}});

        expect(() => findRenderedComponentWithType(sharingComponent, AutoComplete)).not.to.throw();
    });

    it('should set the type of the autoComplete to be userGroup', () => {
        const objectToShare = {
            name: 'Facility Funding Agency',
            modelDefinition: objectToShareModelDefinition,
        };
        renderComponent({objectToShare});

        const autoCompleteComponent = findRenderedComponentWithType(sharingComponent, AutoComplete);

        expect(autoCompleteComponent.props.forType).to.deep.equal('userGroup');
    });

    it('should pass add a new userGroupAccesses when addUserGroup is called', () => {
        const objectToShare = {
            name: 'Facility Funding Agency',
            modelDefinition: objectToShareModelDefinition,
        };
        renderComponent({objectToShare});

        sharingComponent.addUserGroup({id: 'dl5cDMuUhmF', name: 'AFG'});

        setTimeout(() => {
            expect(sharingComponent.state.objectToShare.userGroupAccesses.length).to.equal(3);
        });
    });

    it('should pass add a new userGroupAccesses when addUserGroup is called', () => {
        const objectToShare = {
            name: 'Facility Funding Agency',
            modelDefinition: objectToShareModelDefinition,
        };
        renderComponent({objectToShare});

        sharingComponent.addUserGroup({id: 'dl5cDMuUhmF', name: 'AFG'});

        setTimeout(() => {
            expect(sharingComponent.state.objectToShare.userGroupAccesses[2].access).to.equal('r-------');
        });
    });

    it('should pass the addUserGroup method to the autocomplete box', () => {
        const objectToShare = {
            name: 'Facility Funding Agency',
            modelDefinition: objectToShareModelDefinition,
        };
        renderComponent({objectToShare});

        const autoCompleteComponent = findRenderedComponentWithType(sharingComponent, AutoComplete);

        expect(autoCompleteComponent.props.onSuggestionClicked).to.equal(sharingComponent.addUserGroup);
    });
});
