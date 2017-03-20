/* eslint no-undef: 0 */

import React from 'react';
import { shallow } from 'enzyme';
import Subheader from 'material-ui/Subheader';

import { getStubContext } from '../../config/inject-theme';
import Sharing from '../../src/sharing/Sharing.component';
import Heading from '../../src/headings/Heading.component';
import CreatedBy from '../../src/sharing/CreatedBy.component';
import UserSearch from '../../src/sharing/UserSearch.component';
import PublicAccess from '../../src/sharing/PublicAccess.component';
import ExternalAccess from '../../src/sharing/ExternalAccess.component';
import UserGroupAccess from '../../src/sharing/UserGroupAccess.component';

const sharingProps = {
    authorOfSharableItem: {
        id: 'GOLswS44mh8',
        name: 'Tom Wakiki',
    },
    nameOfSharableItem: 'ANC: Overview Report (HTML-based)',
    canSetPublicAccess: true,
    canSetExternalAccess: true,
    publicCanView: true,
    publicCanEdit: true,
    isSharedExternally: true,
    accesses: [{
        id: 'lFHP5lLkzVr',
        name: 'System administrators',
        displayName: 'System administrators',
        type: 'userGroup',
        canView: true,
        canEdit: false,
    }, {
        id: 'rWLrZL8rP3K',
        name: 'Guest User',
        displayName: 'Guest User',
        type: 'user',
        canView: true,
        canEdit: false,
    }],
    onSharingChanged: () => {},
    onSearch: () => {},
};

const exampleUserGroup = {
    id: 'vAvEltyXGbD',
    name: 'Africare HQ',
    displayName: 'Africare HQ',
    type: 'userGroup',
    canView: true,
    canEdit: false,
};

describe('Sharing: Sharing component', () => {
    let sharingComponent;

    const renderComponent = (props = {}) => {
        const sharing = shallow(<Sharing {...props} />, {
            context: getStubContext(),
        });

        return sharing;
    };

    beforeEach(() => {
        sharingComponent = renderComponent(sharingProps);
    });

    it('renders the object name using a Heading component', () => {
        const headerComponent = sharingComponent.find(Heading);
        expect(headerComponent.props().text).to.equal('ANC: Overview Report (HTML-based)');
    });

    it('should render the CreatedBy component with the authorOfSharableItem prop', () => {
        const createdByComponent = sharingComponent.find(CreatedBy);
        expect(createdByComponent.props().user).to.deep.equal(sharingProps.authorOfSharableItem);
    });

    it('should render a sub header above the permissions list', () => {
        const subheaderComponent = sharingComponent.find(Subheader);
        expect(subheaderComponent.childAt(0).text()).to.equal('who_has_access_translated');
    });

    describe('PublicAccess', () => {
        let publicAccessComponent;

        beforeEach(() => {
            publicAccessComponent = sharingComponent.find(PublicAccess);
        });

        it('inherits props correctly from parent', () => {
            expect(publicAccessComponent.props().canView).to.equal(sharingProps.publicCanView);
            expect(publicAccessComponent.props().canEdit).to.equal(sharingProps.publicCanEdit);
            expect(publicAccessComponent.props().disabled).to.not.equal(sharingProps.canSetPublicAccess);
        });
    });

    describe('ExternalAccess', () => {
        let externalAccessComponent;

        beforeEach(() => {
            externalAccessComponent = sharingComponent.find(ExternalAccess);
        });

        it('inherits the canView and disabled props from parent', () => {
            expect(externalAccessComponent.props().canView).to.equal(sharingProps.publicCanView);
            expect(externalAccessComponent.props().disabled).to.not.equal(sharingProps.canSetPublicAccess);
        });
    });

    describe('UserGroupAccess', () => {
        it('should render once per access', () => {
            expect(sharingComponent.find(UserGroupAccess)).to.have.length(2);

            sharingComponent = renderComponent({
                ...sharingProps, accesses: [...sharingProps.accesses, exampleUserGroup],
            });

            expect(sharingComponent.find(UserGroupAccess)).to.have.length(3);
        });

        it('is passed the correct access props', () => {
            const userGroupAccess = sharingComponent.find(UserGroupAccess).at(0);
            expect(userGroupAccess.props().nameOfGroup).to.equal('System administrators');
            expect(userGroupAccess.props().groupType).to.equal('userGroup');
            expect(userGroupAccess.props().canView).to.equal(true);
            expect(userGroupAccess.props().canEdit).to.equal(false);
        });
    });

    describe('UserSearch', () => {
        let userSearchComponent;

        beforeEach(() => {
            userSearchComponent = sharingComponent.find(UserSearch);
        });

        it('should render correctly', () => {
            expect(sharingComponent.find(UserSearch)).to.have.length(1);
        });

        it('should pass the onSearch function', () => {
            expect(userSearchComponent.props().onSearch).to.equal(sharingProps.onSearch);
        });
    });
});
