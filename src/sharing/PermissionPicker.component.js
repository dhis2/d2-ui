/* eslint react/jsx-no-bind: 0 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import { config } from 'd2/lib/d2';

import PermissionOption from './PermissionOption.component';

config.i18n.strings.add('can_edit_and_view');
config.i18n.strings.add('can_capture_data');
config.i18n.strings.add('can_view_data');
config.i18n.strings.add('can_view_only');
config.i18n.strings.add('no_access');

const styles = {
    optionHeader: {
        paddingLeft: 16,
        paddingTop: 16,
        fontWeight: '400',
        color: 'gray',
    },
};

const getAccessIcon = (metaAccess) => {
    if (metaAccess.canEdit) {
        return 'create';
    }

    return metaAccess.canView
        ? 'remove_red_eye'
        : 'not_interested';
};

class PermissionPicker extends Component {
    state = {
        open: false,
    };

    onOptionClick = (event, menuItem) => {
        const newAccess = {
            ...this.props.access,
            ...menuItem.props.value,
        };

        this.props.onChange(newAccess);
    }

    openMenu = (event) => {
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
                            value={{ meta: { canView: true, canEdit: true } }}
                            primaryText={this.translate('can_edit_and_view')}
                            isSelected={meta.canEdit}
                        />
                        <PermissionOption
                            disabled={!metaOptions.canView}
                            value={{ meta: { canView: true, canEdit: false } }}
                            primaryText={this.translate('can_view_only')}
                            isSelected={!meta.canEdit && meta.canView}
                        />
                        <PermissionOption
                            disabled={!metaOptions.noAccess}
                            value={{ meta: { canView: false, canEdit: false } }}
                            primaryText={this.translate('no_access')}
                            isSelected={!meta.canEdit && !meta.canView}
                        />
                    </Menu>
                    <Divider />

                    { dataOptions &&
                        <div>
                            <OptionHeader text={this.translate('data')} />
                            <Menu onItemTouchTap={this.onOptionClick}>
                                <PermissionOption
                                    disabled={!dataOptions.canEdit}
                                    value={{ data: { canView: true, canEdit: true } }}
                                    primaryText={this.translate('can_capture_data')}
                                    isSelected={data.canEdit}
                                />
                                <PermissionOption
                                    disabled={!dataOptions.canView}
                                    value={{ data: { canView: true, canEdit: false } }}
                                    primaryText={this.translate('can_view_data')}
                                    isSelected={!data.canEdit && data.canView}
                                />
                                <PermissionOption
                                    disabled={!dataOptions.noAccess}
                                    value={{ data: { canView: false, canEdit: false } }}
                                    primaryText={this.translate('no_access')}
                                    isSelected={!data.canEdit && !data.canView}
                                />
                            </Menu>
                        </div>
                    }
                </Popover>
            </div>
        );
    }
}

PermissionPicker.propTypes = {
    access: PropTypes.object.isRequired,
    accessOptions: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

PermissionPicker.defaultProps = {
    disabled: false,
};

PermissionPicker.contextTypes = {
    d2: PropTypes.object.isRequired,
};

const OptionHeader = ({ text }) => (
    <div style={styles.optionHeader}>
        {text.toUpperCase()}
    </div>
);

OptionHeader.propTypes = {
    text: PropTypes.string.isRequired,
};

export default PermissionPicker;
