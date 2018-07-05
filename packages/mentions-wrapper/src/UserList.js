import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Popover from 'material-ui/Popover';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

import i18n from '@dhis2/d2-i18n';

const styles = theme => ({
    popover: {
        // ensure the popover show on top of other dialogs/modals
        zIndex: 2000,
    },
    list: {
        maxHeight: 180,
    },
    selected: {
        backgroundColor: 'lightgrey', // TODO not the same color as the MUI one, also clashes when the mouse is moved on the list, as the selection done programmatically remains active
    },
    filter: {
        display: 'block',
        padding: '8px 24px',
        color: 'gray',
        fontSize: '0.8125rem',
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
            className={classes.popover}
        >
            {users.length ? (
                <Fragment>
                    <Typography variant="subheading">
                        <em className={classes.filter}>
                            {i18n.t('Searching for "{{filter}}"', { filter })}
                        </em>
                    </Typography>
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
                <em className={classes.filter}>
                    {i18n.t('No results found for "{{filter}}"', { filter })}
                </em>
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
