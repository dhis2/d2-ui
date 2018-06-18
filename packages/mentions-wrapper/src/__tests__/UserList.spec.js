import React from 'react';
import { shallow } from 'enzyme';
import List, { ListItem, ListItemText } from 'material-ui/List';

import { UserList } from '../UserList';

describe('Mentions: MentionsWrapper > UserList component', () => {
    let userList;
    let onUserSelect;
    let props;

    beforeEach(() => {
        onUserSelect = jest.fn();

        props = {
            classes: { selected: { backgroundColor: 'lightgrey' } },
            users: [
                { id: 'jc', displayName: 'Johnny Cash', userCredentials: { username: 'sue' } },
                {
                    id: 'ec',
                    displayName: 'Eric Clapton',
                    userCredentials: { username: 'slowhand' },
                },
                { id: 'jj', displayName: 'Justin Johnson', userCredentials: { username: 'slide' } },
            ],
            selectedUser: {
                id: 'jj',
                displayName: 'Justin Johnson',
                userCredentials: { username: 'slide' },
            },
            onUserSelect,
        };

        userList = shallow(<UserList {...props} />);
    });

    it('should render the users list', () => {
        expect(userList.find(List)).toHaveLength(1);
        expect(userList.find(ListItem)).toHaveLength(3);
    });

    it('should show the formatted user information', () => {
        expect(
            userList
                .find(ListItemText)
                .first()
                .props().primary
        ).toEqual('Johnny Cash (sue)');
    });

    it('should trigger the onUserSelect callback when an item in the list is clicked', () => {
        const listItem = userList.find(ListItem).first();

        listItem.simulate('click');

        expect(onUserSelect).toHaveBeenCalledTimes(1);
        expect(onUserSelect).toHaveBeenCalledWith(props.users[0]);
    });
});
