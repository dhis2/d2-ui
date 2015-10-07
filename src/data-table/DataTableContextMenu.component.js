import React from 'react';
import classes from 'classnames';
import Translate from '../i18n/Translate.mixin';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import FontIcon from 'material-ui/lib/font-icon';

const DataTableContextMenu = React.createClass({
    propTypes: {
        actions: React.PropTypes.objectOf(React.PropTypes.func),
        activeItem: React.PropTypes.object,
        coords: React.PropTypes.shape({
            X: React.PropTypes.number,
            Y: React.PropTypes.number,
        }),
        icons: React.PropTypes.object,
    },

    mixins: [Translate],

    getDefaultProps() {
        return {
            coords: {
                X: 0,
                Y: 0,
            },
            icons: {},
        };
    },

    getInitialState() {
        return {
            actions: this.props.actions || {},
        };
    },

    render() {
        const classList = classes('data-table__context-menu');

        const actionList = Object
            .keys(this.state.actions)
            .filter(menuActionKey => typeof this.state.actions[menuActionKey] === 'function');

        return (
            <div className={classList}
                 style={{position: 'absolute', top: this.props.coords.Y, left: this.props.coords.X}}>
                <Menu openDirection="bottom-right"
                      desktop
                    >
                    {actionList.map((action) => {
                        const iconName = this.props.icons[action] ? this.props.icons[action] : action;

                        return (<MenuItem key={action}
                                          className={'data-table__context-menu__item'}
                                          onClick={this.handleClick.bind(this, action)}
                                          primaryText={this.getTranslation(action)}
                                          leftIcon={<FontIcon className="material-icons">{iconName}</FontIcon>}
                                />);
                    })}
                </Menu>
            </div>
        );
    },

    handleClick(action) {
        this.props.actions[action].apply(this.props.actions, [this.props.activeItem]);
    },
});

export default DataTableContextMenu;
