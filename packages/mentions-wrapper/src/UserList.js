import React, { Fragment } from 'react';
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
    filter: {
        display: 'block',
        padding: '8px 16px',
        color: 'gray',
        fontSize: 13,
    },
});

export const UserList = ({
    classes,
    open,
    anchorEl,
    users,
    filter,
    selectedUser,
    onClose,
    onSelect,
}) => {
    const onClick = user => event => {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
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
            {users.length ? (
                <Fragment>
                    <em className={classes.filter}>Searching for "{filter}"</em>
                    <List dense disablePadding className={classes.list}>
                        {users.map(u => (
                            <ListItem
                                button
                                key={u.id}
                                onClick={onClick(u)}
                                className={
                                    selectedUser && selectedUser.id === u.id
                                        ? classes.selected
                                        : null
                                }
                            >
                                <ListItemText
                                    primary={`${u.displayName} (${u.userCredentials.username})`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Fragment>
            ) : (
                <em className={classes.filter}>No results found for "{filter}"</em>
            )}
        </Popover>
    );
};

UserList.defaultProps = {
    open: false,
    anchorEl: null,
    users: [],
    selectedUser: null,
    filter: null,
};

UserList.propTypes = {
    open: PropTypes.bool,
    anchorEl: PropTypes.object,
    users: PropTypes.array,
    selectedUser: PropTypes.object,
    filter: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default withStyles(styles)(UserList);
