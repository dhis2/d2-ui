/* eslint react/jsx-no-bind: 0 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import PermissionOption from './PermissionOption.component';
import { config } from 'd2/lib/d2';

config.i18n.strings.add('can_edit_and_view');
config.i18n.strings.add('can_view_only');
config.i18n.strings.add('no_access');

const getAccessIcon = metaAccess => metaAccess.canEdit
    ? 'create'
    : metaAccess.canView
        ? 'remove_red_eye'
        : 'not_interested';

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

    translate = s => this.context.d2.i18n.getTranslation(s);

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
                    <OptionHeader text={this.translate('metadata')} />
                    <Menu onItemTouchTap={this.onOptionClick}>
                        <PermissionOption
                            disabled={!metaOptions.canEdit}
                            value={{ meta: { canView: true, canEdit: true }}}
                            primaryText={this.translate('can_edit_and_view')}
                            icon={meta.canEdit ? 'done' : ''}
                        />
                        <PermissionOption
                            disabled={!metaOptions.canView}
                            value={{ meta: { canView: true, canEdit: false }}}
                            primaryText={this.translate('can_view_only')}
                            icon={!meta.canEdit && meta.canView ? 'done' : ''}
                        />
                        <PermissionOption
                            disabled={!metaOptions.noAccess}
                            value={{ meta: { canView: false, canEdit: false }}}
                            primaryText={this.translate('no_access')}
                            icon={!meta.canEdit && !meta.canView ? 'done' : ''}
                        />
                    </Menu>
                    <Divider />

                    { dataOptions &&
                        <div>
                            <OptionHeader text={this.translate('data')} />
                            <Menu onItemTouchTap={this.onOptionClick}>
                                <PermissionOption
                                    disabled={!dataOptions.canEdit}
                                    value={{ data: { canView: true, canEdit: true }}}
                                    primaryText={this.translate('can_capture_data')}
                                    icon={data.canEdit ? 'done' : ''}
                                />
                                <PermissionOption
                                    disabled={!dataOptions.canView}
                                    value={{ data: { canView: true, canEdit: false }}}
                                    primaryText={this.translate('can_view_data')}
                                    icon={!data.canEdit && data.canView ? 'done' : ''}
                                />
                                <PermissionOption
                                    disabled={!dataOptions.noAccess}
                                    value={{ data: { canView: false, canEdit: false }}}
                                    primaryText={this.translate('no_access')}
                                    icon={!data.canEdit && !data.canView ? 'done' : ''}
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
