import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    selected: {
        backgroundColor: 'lightgrey', // TODO not the same color as the MUI one, also clashes when the mouse is moved on the list, as the selection done programmatically remains active
    },
});

export const UserList = ({ classes, users, selectedUser, onUserSelect }) => {
    const onClick = user => event => {
        event.stopPropagation();

        onUserSelect(user);
    };

    return (
        <List dense disablePadding>
            {users.length
                ? users.map(u => (
                      <ListItem
                          button
                          key={u.id}
                          onClick={onClick(u)}
                          className={
                              selectedUser && selectedUser.id === u.id ? classes.selected : null
                          }
                      >
                          <ListItemText
                              primary={`${u.displayName} (${u.userCredentials.username})`}
                          />
                      </ListItem>
                  ))
                : null}
        </List>
    );
};

UserList.defaultProps = {
    users: [],
    selectedUser: null,
};

UserList.propTypes = {
    users: PropTypes.array,
    selectedUser: PropTypes.object,
    onUserSelect: PropTypes.func.isRequired,
};

export default withStyles(styles)(UserList);
