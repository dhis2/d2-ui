import React from 'react';
import {getStubContext} from '../../config/inject-theme';
import CreatedBy from '../../src/sharing/CreatedBy.component';

import {shallow} from 'enzyme';

describe('Sharing: CreatedBy component', () => {
    let createdByComponent;
    const renderComponent = (props = {}) => {
        createdByComponent = shallow(<CreatedBy {...props} />, {
            context: getStubContext(),
        });
    };

    it('should render a h1 tag with the title', () => {
        const userObject = {
            id: 'GOLswS44mh8',
            name: 'Tom Wakiki',
            created: '2012-11-21T11:02:04.303+0000',
            lastUpdated: '2014-12-19T11:28:37.065+0000',
            href: 'http://localhost:8080/dhis/api/users/GOLswS44mh8',
        };
        renderComponent({user: userObject});

        expect(createdByComponent.text()).to.equal('created_by_translated: Tom Wakiki');
    });

    it('should use a default object for the user when no object was given', () => {
        createdByComponent.setProps({
            user: undefined,
        });

        expect(createdByComponent.text()).to.equal('created_by_translated: ');
    });
});
