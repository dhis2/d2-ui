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
    let users;

    beforeEach(() => {
        onSelect = jest.fn();
        onClose = jest.fn();

        users = [
            {
                id: 'ec',
                displayName: 'Eric Clapton',
                userCredentials: { username: 'slowhand' },
            },
            { id: 'jc', displayName: 'Johnny Cash', userCredentials: { username: 'sue' } },
            { id: 'jj', displayName: 'Justin Johnson', userCredentials: { username: 'slide' } },
        ];

        props = {
            classes: { selected: { backgroundColor: 'lightgrey' } },
            users,
            selectedUser: users[2],
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
        ).toEqual('Eric Clapton (slowhand)');
    });

    it('should show the user list sorted in alphabetical order by firstname', () => {
        const sortedList = [
            { displayName: 'Eric Clapton' },
            { displayName: 'Johnny Cash' },
            { displayName: 'Justin Johnson' },
        ];

        userList
            .find(ListItemText)
            .forEach((node, i) =>
                expect(node.props().primary).toContain(sortedList[i].displayName)
            );
    });

    it('should trigger the onSelect callback when an item in the list is clicked', () => {
        const listItem = userList.find(ListItem).first();
        listItem.simulate('click');

        const expectedResult = {
            id: 'ec',
            displayName: 'Eric Clapton',
            userCredentials: { username: 'slowhand' },
        };

        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toHaveBeenCalledWith(expectedResult);
    });
});
