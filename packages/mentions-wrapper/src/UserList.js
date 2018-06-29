import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    selected: {
        backgroundColor: 'lightgrey', // TODO not the same color as the MUI one, also clashes when the mouse is moved on the list, as the selection done programmatically remains active
    },
});

export const UserList = ({ classes, users, open, selectedUser, onUserSelect }) => {
    const onClick = user => event => {
        if (event) {
            event.stopPropagation();
        }

        onUserSelect(user);
    };

    return ReactDOM.createPortal(
        <div
            style={{
                backgroundColor: '#fff',
                position: 'absolute',
                top: 41,
                left: 0,
                display: open ? 'block' : 'none',
                maxHeight: 180,
                overflow: 'auto',
                borderStyle: 'solid',
                borderWidth: 1,
                borderColor: 'lightgrey', // TODO use colors from app theme
                zIndex: 9000,
            }}
        >
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
        </div>,
        document.body
    );
};

UserList.defaultProps = {
    users: [],
    open: false,
    selectedUser: null,
};

UserList.propTypes = {
    users: PropTypes.array,
    open: PropTypes.bool,
    selectedUser: PropTypes.object,
    onUserSelect: PropTypes.func.isRequired,
};

export default withStyles(styles)(UserList);
