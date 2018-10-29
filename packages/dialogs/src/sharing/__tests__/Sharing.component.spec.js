import React from 'react';
import { shallow } from 'enzyme';
import Typography from '@material-ui/core/Typography';
import { getStubContext } from '../../../../../config/inject-theme';
import Sharing from '../Sharing.component';
import { Heading } from '@dhis2/d2-ui-core';
import CreatedBy from '../CreatedBy.component';
import UserSearch from '../UserSearch.component';
import { GroupAccess } from '../Access.component';

const sharingProps = {
    sharedObject: {
        meta: {
            allowPublicAccess: true,
            allowExternalAccess: false,
        },
        object: {
            id: 'veGzholzPQm',
            name: 'HIV age',
            displayName: 'HIV age',
            publicAccess: 'rw------',
            externalAccess: false,
            user: {
                id: 'GOLswS44mh8',
                name: 'Tom Wakiki',
            },
            userGroupAccesses: [{
                id: 'Rg8wusV7QYi',
                name: 'HIV Program Coordinators',
                displayName: 'HIV Program Coordinators',
                access: 'rw------',
            }],
            userAccesses: [{
                id: 'N3PZBUlN8vq',
                name: 'John Kamara',
                displayName: 'John Kamara',
                access: 'r-------',
            }],
        },
    },
    dataShareable: false,
    onChange: () => {},
    onSearch: () => {},
};

const exampleUserAccessGroup = {
    id: 'vAvEltyXGbD',
    name: 'Africare HQ',
    displayName: 'Africare HQ',
    access: 'r-------',
};

describe('Sharing: Sharing component', () => {
    let sharingComponent;

    const renderComponent = (props = {}) => {
        return shallow(<Sharing {...props} />, {
            context: getStubContext(),
        });
    };

    beforeEach(() => {
        sharingComponent = renderComponent(sharingProps);
    });

    it('renders the object name using a Heading component', () => {
        const headerComponent = sharingComponent.find(Heading);
        expect(headerComponent.props().text).toBe('HIV age');
    });

    it('should render the CreatedBy component with the sharedObject\'s author', () => {
        const createdByComponent = sharingComponent.find(CreatedBy);
        expect(createdByComponent.props().user).toEqual(sharingProps.authorOfSharableItem);
    });

    it('should render a sub header above the permissions list', () => {
        const subheaderComponent = sharingComponent.find(Typography);
        expect(subheaderComponent.childAt(0).text()).toBe('who_has_access_translated');
    });

    describe('GroupAccess', () => {
        it('should render once per access', () => {
            expect(sharingComponent.find(GroupAccess)).toHaveLength(2);

            const newProps = { ...sharingProps };
            newProps.sharedObject.object.userGroupAccesses.push(exampleUserAccessGroup);
            sharingComponent = renderComponent(newProps);

            expect(sharingComponent.find(GroupAccess)).toHaveLength(3);
        });
    });

    describe('UserSearch', () => {
        let userSearchComponent;

        beforeEach(() => {
            userSearchComponent = sharingComponent.find(UserSearch);
        });

        it('should render correctly', () => {
            expect(sharingComponent.find(UserSearch)).toHaveLength(1);
        });

        it('should pass the onSearch function', () => {
            expect(userSearchComponent.props().onSearch).toBe(sharingProps.onSearch);
        });
    });
});
