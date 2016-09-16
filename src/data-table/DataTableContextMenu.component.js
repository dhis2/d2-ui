import React, { PropTypes } from 'react';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import Popover from 'material-ui/Popover/Popover';
import Paper from 'material-ui/Paper';
import addD2Context from '../component-helpers/addD2Context';

function handleClick(props, action) {
    props.actions[action].apply(props.actions, [props.activeItem]);

    if (props.onRequestClose) {
        props.onRequestClose();
    }
}

function DataTableContextMenu(props, context) {
    const actionList = Object
        .keys(props.actions)
        .filter(menuActionKey => typeof props.actions[menuActionKey] === 'function');

    const cmStyle = {
        position: 'fixed',
    };
    return (
        <Popover
            {...props}
            open={Boolean(props.activeItem)}
            anchorEl={props.target}
            anchorOrigin={{ horizontal: 'middle', vertical: 'center' }}
            animated={false}
            style={cmStyle}
            animation={Paper}
        >
            <Menu className="data-table__context-menu" desktop>
                {actionList.map((action) => {
                    const iconName = props.icons[action] ? props.icons[action] : action;

                    return (
                        <MenuItem
                            key={action}
                            data-object-id={props.activeItem && props.activeItem.id}
                            className={'data-table__context-menu__item'}
                            onClick={() => handleClick(props, action)}
                            primaryText={context.d2.i18n.getTranslation(action)}
                            leftIcon={<FontIcon className="material-icons">{iconName}</FontIcon>}
                        />
                    );
                })}
            </Menu>
        </Popover>
    );
}

DataTableContextMenu.defaultProps = {
    icons: {},
    actions: {},
};

DataTableContextMenu.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    activeItem: PropTypes.object,
    icons: PropTypes.object,
    target: PropTypes.object,
    onRequestClose: PropTypes.func,
};

export default addD2Context(DataTableContextMenu);
