import React from 'react';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Popover from 'material-ui/Popover';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    list: {
        maxHeight: 180,
    },
    selected: {
        backgroundColor: 'lightgrey', // TODO not the same color as the MUI one, also clashes when the mouse is moved on the list, as the selection done programmatically remains active
    },
});

export const UserList = ({ classes, users, open, onClose, anchorEl, selectedUser, onSelect }) => {
    const onClick = user => event => {
        if (event) {
            event.stopPropagation();
        }

        onSelect(user);
    };

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            anchorPosition={{ top: 15, left: 0 }}
            disableAutoFocus
            onClose={onClose}
        >
            <List dense disablePadding className={classes.list}>
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
        </Popover>
    );
};

UserList.defaultProps = {
    users: [],
    open: false,
    anchorEl: null,
    selectedUser: null,
};

UserList.propTypes = {
    users: PropTypes.array,
    open: PropTypes.bool,
    anchorEl: PropTypes.object,
    selectedUser: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default withStyles(styles)(UserList);
