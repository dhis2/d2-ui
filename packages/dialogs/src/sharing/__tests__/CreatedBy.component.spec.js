import React from 'react';
import { shallow } from 'enzyme';
import { getStubContext } from '../../../../../config/inject-theme';
import CreatedBy from '../CreatedBy.component';

describe('Sharing: CreatedBy component', () => {
    let createdByComponent;
    const renderComponent = (props = {}) => {
        createdByComponent = shallow(<CreatedBy {...props} />, {
            context: getStubContext(),
        });
    };

    it('should render a div showing the author\'s name', () => {
        const authorObject = {
            id: 'GOLswS44mh8',
            name: 'Tom Wakiki',
            created: '2012-11-21T11:02:04.303+0000',
            lastUpdated: '2014-12-19T11:28:37.065+0000',
            href: 'http://localhost:8080/dhis/api/users/GOLswS44mh8',
        };

        renderComponent({ author: authorObject });
        expect(createdByComponent.text()).toBe('created_by_translated: Tom Wakiki');
    });
});
