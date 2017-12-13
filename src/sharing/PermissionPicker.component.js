/* eslint react/jsx-no-bind: 0 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import Heading from '../headings/Heading.component';
import { config } from 'd2/lib/d2';

config.i18n.strings.add('can_edit_and_view');
config.i18n.strings.add('can_view_only');
config.i18n.strings.add('no_access');

const getAccessIcon = metaAccess => metaAccess.canEdit
    ? 'create'
    : metaAccess.canView
        ? 'remove_red_eye'
        : 'not_interested';

const createMenuItem = (text, access, isSelected, disabled) => {
    return !disabled && (
        <MenuItem
            insetChildren
            value={{ canView, canEdit }}
            primaryText={text}
            leftIcon={
                <FontIcon className="material-icons">
                    {isSelected ? 'done' : ''}
                </FontIcon>
            }
        />
    );
}

class PermissionPicker extends Component {
    state = {
        open: false,
    };

    openMenu = event => {
        event.preventDefault();
        this.setState({
            open: true,
            anchor: event.currentTarget,
        });
    }

    closeMenu = () => {
        this.setState({
            open: false,
        });
    }

    onOptionClick = (event, menuItem) => {
        const newAccess = {
            ...this.props.access,
            ...menuItem.props.value,
        };

        this.props.onChange(newAccess);
    }

    render = () => {
        const { data, meta } = this.props.access;
        const { data: dataOptions, meta: metaOptions } = this.props.accessOptions;

        return (
            <div>
                <IconButton
                    onClick={this.openMenu}
                    disabled={this.props.disabled}
                    iconClassName="material-icons"
                >
                    {getAccessIcon(meta)}
                </IconButton>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchor}
                    onRequestClose={this.closeMenu}
                >
                    <OptionHeader text={this.context.d2.i18n.getTranslation('metadata')} />
                    <Menu onItemTouchTap={this.onOptionClick}>
                        <MenuItem
                            insetChildren
                            disabled={!metaOptions.canEdit}
                            value={{ meta: { canView: true, canEdit: true }}}
                            primaryText={this.context.d2.i18n.getTranslation('can_edit_and_view')}
                            leftIcon={
                                <FontIcon className="material-icons">
                                    {meta.canEdit ? 'done' : ''}
                                </FontIcon>
                            }
                        />
                        <MenuItem
                            insetChildren
                            disabled={!metaOptions.canView}
                            value={{ meta: { canView: true, canEdit: false }}}
                            primaryText={this.context.d2.i18n.getTranslation('can_view_only')}
                            leftIcon={
                                <FontIcon className="material-icons">
                                    {!meta.canEdit && meta.canView ? 'done' : ''}
                                </FontIcon>
                            }
                        />
                        <MenuItem
                            insetChildren
                            disabled={!metaOptions.noAccess}
                            value={{ meta: { canView: false, canEdit: false }}}
                            primaryText={this.context.d2.i18n.getTranslation('no_access')}
                            leftIcon={
                                <FontIcon className="material-icons">
                                    {!meta.canEdit && !meta.canView ? 'done' : ''}
                                </FontIcon>
                            }
                        />
                    </Menu>
                    <Divider />

                    { dataOptions &&
                        <div>
                            <OptionHeader text={this.context.d2.i18n.getTranslation('data')} />
                            <Menu onItemTouchTap={this.onOptionClick}>
                                <MenuItem
                                    insetChildren
                                    disabled={!dataOptions.canEdit}
                                    value={{ data: { canView: true, canEdit: true }}}
                                    primaryText={this.context.d2.i18n.getTranslation('can_capture_data')}
                                    leftIcon={
                                        <FontIcon className="material-icons">
                                            {data.canEdit ? 'done' : ''}
                                        </FontIcon>
                                    }
                                />
                                <MenuItem
                                    insetChildren
                                    disabled={!dataOptions.canView}
                                    value={{ data: { canView: true, canEdit: false }}}
                                    primaryText={this.context.d2.i18n.getTranslation('can_view_data')}
                                    leftIcon={
                                        <FontIcon className="material-icons">
                                            {!data.canEdit && data.canView ? 'done' : ''}
                                        </FontIcon>
                                    }
                                />
                                <MenuItem
                                    insetChildren
                                    disabled={!dataOptions.noAccess}
                                    value={{ data: { canView: false, canEdit: false }}}
                                    primaryText={this.context.d2.i18n.getTranslation('no_access')}
                                    leftIcon={
                                        <FontIcon className="material-icons">
                                            {!data.canEdit && !data.canView ? 'done' : ''}
                                        </FontIcon>
                                    }
                                />
                            </Menu>
                        </div>
                    }
                </Popover>
            </div>
        );
    }
}

PermissionPicker.contextTypes = {
    d2: PropTypes.object.isRequired,
};

const OptionHeader = ({ text }) => (
    <div style={{
        paddingLeft: 16,
        paddingTop: 16,
        fontWeight: '400',
        color: 'gray',
    }}>
        {text.toUpperCase()}
    </div>
);

export default PermissionPicker;
