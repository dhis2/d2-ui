import React from 'react';
import { shallow } from 'enzyme';
import { getStubContext } from '../../../../config/inject-theme';

import MentionsWrapper from '../MentionsWrapper';
import UserList from '../UserList';

describe('Mentions: MentionsWrapper component', () => {
    let mentionsWrapper;
    let props;

    const context = getStubContext();

    beforeEach(() => {
        props = {
            d2: context.d2,
        };

        mentionsWrapper = shallow(
            <MentionsWrapper {...props}>
                <input />
            </MentionsWrapper>
        );
    });

    it('should have rendered a result', () => {
        expect(mentionsWrapper).toHaveLength(1);
    });

    it('should render an input element', () => {
        expect(mentionsWrapper.find('input')).toHaveLength(1);
    });

    it('should render a UserList', () => {
        expect(mentionsWrapper.find(UserList)).toHaveLength(1);
    });
});
