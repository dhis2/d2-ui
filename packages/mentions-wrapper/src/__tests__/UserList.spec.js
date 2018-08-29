import React from 'react';
import { shallow } from 'enzyme';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Popover from '@material-ui/core/Popover';


import { UserList } from '../UserList';

describe('Mentions: MentionsWrapper > UserList component', () => {
    let userList;
    let onSelect;
    let onClose;
    let props;

    beforeEach(() => {
        onSelect = jest.fn();
        onClose = jest.fn();

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
            onSelect,
            onClose,
        };

        userList = shallow(<UserList {...props} />);
    });

    it('should render a Popover component', () => {
        expect(userList.find(Popover)).toHaveLength(1);
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

    it('should trigger the onSelect callback when an item in the list is clicked', () => {
        const listItem = userList.find(ListItem).first();

        listItem.simulate('click');

        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith(props.users[0]);
    });
});
