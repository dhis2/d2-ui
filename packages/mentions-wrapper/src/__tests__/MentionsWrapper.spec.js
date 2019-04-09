import React from 'react';
import { mount } from 'enzyme';
import { getStubContext } from '../../../../config/inject-theme';

import MentionsWrapper from '../MentionsWrapper';
import UserList from '../UserList';

describe('Mentions: MentionsWrapper component', () => {
    let mentionsWrapper;
    let input;
    let props;
    const lookupUser = jest.fn();
    const onUserSelect = jest.fn();

    const context = getStubContext();

    const users = [
        {
            id: 1,
            displayName: 'Johnny Cash',
            userCredentials: { username: 'johnny' },
        },
        {
            id: 2,
            displayName: 'Justin Johnson',
            userCredentials: { username: 'justin' },
        },
    ];

    beforeEach(() => {
        lookupUser.mockClear();

        props = {
            d2: context.d2,
            onUserSelect: jest.fn(),
        };

        mentionsWrapper = mount(
            <MentionsWrapper {...props}>
                <input />
            </MentionsWrapper>
        );

        mentionsWrapper.setState({
            users,
        });

        mentionsWrapper.instance().lookupUser = lookupUser;
        mentionsWrapper.instance().onUserSelect = onUserSelect;

        input = mentionsWrapper.find('input').getDOMNode();
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

    it('trigger lookupUser when typing @', () => {
        mentionsWrapper.simulate('keydown', {
            key: '@',
            target: input,
        });

        expect(lookupUser).toHaveBeenCalled();
    });

    it('triggers lookupUser with the filter when typing @ followed by some text', () => {
        mentionsWrapper.simulate('keydown', {
            key: '@',
            target: input,
        });

        mentionsWrapper.instance().onInput({ target: { value: '@e', selectionEnd: 2 } });
        expect(lookupUser).toHaveBeenLastCalledWith('e');
    });

    it('does not trigger lookupUser when list navigation is used', () => {
        mentionsWrapper.simulate('keydown', {
            key: '@',
            target: input,
        });

        expect(lookupUser).toHaveBeenCalled();

        lookupUser.mockClear();

        ['ArrowDown', 'ArrowUp'].forEach(key => {
            mentionsWrapper.simulate('keydown', {
                key,
                target: input,
            });

            expect(lookupUser).not.toHaveBeenCalled();
        });
    });

    it('triggers onUserSelect when Enter is pressed', () => {
        mentionsWrapper.simulate('keydown', {
            key: '@',
            target: input,
        });

        mentionsWrapper.simulate('keydown', {
            key: 'Enter',
            target: input,
        });

        expect(onUserSelect).toHaveBeenCalledWith(users[0]);
    });
});
