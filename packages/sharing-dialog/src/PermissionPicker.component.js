import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import CreateIcon from '@material-ui/icons/Create';
import VisibilityIcon from '@material-ui/icons/Visibility';

import PermissionOption from './PermissionOption.component';

const styles = {
    optionHeader: {
        paddingLeft: 16,
        paddingTop: 16,
        fontWeight: '500',
        color: 'gray',
    },
};

const AccessIcon = ({metaAccess, disabled}) => {
    const iconProps = {
        color: disabled ? "disabled" : "action"
    };
    if (metaAccess.canEdit) {
        return <CreateIcon {...iconProps} />;
    }

    return metaAccess.canView ? <VisibilityIcon {...iconProps} /> : <NotInterestedIcon {...iconProps} />;
};

class PermissionPicker extends Component {
    constructor(props, context) {
        super(props);
        context.d2.i18n.addStrings([
            'can_edit_and_view',
            'can_capture_and_view',
            'can_view_only',
            'no_access',
        ]);
    }

    state = {
        open: false,
    };

    onOptionClick = (access) => () => {
        const newAccess = {
            ...this.props.access,
            ...access,
        };

        this.props.onChange(newAccess);
    };

    openMenu = (event) => {
        event.preventDefault();
        this.setState({
            open: true,
            anchor: event.currentTarget,
        });
    };

    closeMenu = () => {
        this.setState({
            open: false,
        });
    };

    translate = s => this.context.d2.i18n.getTranslation(s);

    render = () => {
        const { data, meta } = this.props.access;
        const {
            data: dataOptions,
            meta: metaOptions,
        } = this.props.accessOptions;

        return (
            <Fragment>
                <IconButton
                    onClick={this.openMenu}
                    disabled={this.props.disabled}
                >
                    <AccessIcon metaAccess={meta} disabled={this.props.disabled} />
                </IconButton>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchor}
                    onClose={this.closeMenu}
                >
                    <OptionHeader text={this.translate('metadata')} />

                        <PermissionOption
                            disabled={!metaOptions.canEdit}
                            primaryText={this.translate('can_edit_and_view')}
                            isSelected={meta.canEdit}
                            onClick={this.onOptionClick({ meta: { canView: true, canEdit: true } })}
                        />
                        <PermissionOption
                            disabled={!metaOptions.canView}
                            primaryText={this.translate('can_view_only')}
                            isSelected={!meta.canEdit && meta.canView}
                            onClick={this.onOptionClick({ meta: { canView: true, canEdit: false } })}
                        />
                        <PermissionOption
                            disabled={!metaOptions.noAccess}
                            primaryText={this.translate('no_access')}
                            isSelected={!meta.canEdit && !meta.canView}
                            onClick={this.onOptionClick({ meta: { canView: false, canEdit: false } })}
                        />

                    <Divider />

                    {dataOptions && (
                        <Fragment>
                            <OptionHeader text={this.translate('data')} />

                                <PermissionOption
                                    disabled={!dataOptions.canEdit}
                                    primaryText={this.translate(
                                        'can_capture_and_view'
                                    )}
                                    isSelected={data.canEdit}
                                    onClick={this.onOptionClick({
                                        data: { canView: true, canEdit: true },
                                    })}
                                />
                                <PermissionOption
                                    disabled={!dataOptions.canView}
                                    primaryText={this.translate(
                                        'can_view_only'
                                    )}
                                    isSelected={!data.canEdit && data.canView}
                                    onClick={this.onOptionClick({
                                        data: { canView: true, canEdit: false },
                                    })}
                                />
                                <PermissionOption
                                    disabled={!dataOptions.noAccess}
                                    primaryText={this.translate('no_access')}
                                    isSelected={!data.canEdit && !data.canView}
                                    onClick={this.onOptionClick({
                                        data: {
                                            canView: false,
                                            canEdit: false,
                                        },
                                    })}
                                />

                        </Fragment>
                    )}
                </Popover>
            </Fragment>
        );
    };
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
    <div style={styles.optionHeader}>{text.toUpperCase()}</div>
);

OptionHeader.propTypes = {
    text: PropTypes.string.isRequired,
};

export default PermissionPicker;
