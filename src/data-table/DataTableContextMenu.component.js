import React from 'react';
import Translate from '../i18n/Translate.mixin';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FontIcon from 'material-ui/lib/font-icon';
import Popover from 'material-ui/lib/popover/popover';

const DataTableContextMenu = React.createClass({
    propTypes: {
        actions: React.PropTypes.objectOf(React.PropTypes.func),
        activeItem: React.PropTypes.object,
        icons: React.PropTypes.object,
        target: React.PropTypes.object,
    },

    mixins: [Translate],

    getDefaultProps() {
        return {
            icons: {},
            actions: {},
        };
    },

    render() {
        const actionList = Object
            .keys(this.props.actions)
            .filter(menuActionKey => typeof this.props.actions[menuActionKey] === 'function');

        return (
            <Popover
                {...this.props}
                open={this.props.activeItem ? true : false}
                anchorEl={this.props.target}
                anchorOrigin={{horizontal: 'middle', vertical: 'center'}}
            >
                <Menu className="data-table__context-menu" openDirection="bottom-right" desktop>
                    {actionList.map((action) => {
                        const iconName = this.props.icons[action] ? this.props.icons[action] : action;

                        return (<MenuItem key={action}
                                          data-object-id={this.props.activeItem && this.props.activeItem.id}
                                          className={'data-table__context-menu__item'}
                                          onClick={this.handleClick.bind(this, action)}
                                          primaryText={this.getTranslation(action)}
                                          leftIcon={<FontIcon className="material-icons">{iconName}</FontIcon>}
                                />);
                    })}
                </Menu>
            </Popover>
        );
    },

    handleClick(action) {
        this.props.actions[action].apply(this.props.actions, [this.props.activeItem]);
        this.props.onRequestClose && this.props.onRequestClose();
    },
});

export default DataTableContextMenu;
