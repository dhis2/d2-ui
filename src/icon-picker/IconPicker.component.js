import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Popover from 'material-ui/Popover/Popover';
import Icon from './Icon.component';

const styles = {
    iconPopoverContent: {
        paddingTop: '1rem',
        paddingLeft: '1rem',
        width: '50%',
    },
    // TODO: Load partial style from material-ui
    iconPickerLabel: {
        transformOrigin: 'left top 0px',
        pointerEvents: 'none',
        color: 'rgba(0, 0, 0, 0.498039)',
        padding: '1rem 0 .5rem',
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        transform: 'scale(.75)',
        fontSize: '16px',
    },
};

class IconPicker extends Component {
    state = {
        showIconOptions: false,
        currentIconFileName: this.props.iconFileName,
    };

    onIconSelected = (event, value) => {
        this.setState({
            currentIconFileName: value,
            showIconOptions: false,
        }, () => {
            this.props.onChange(value);
        });
    }

    getIconSrc = (iconPath, iconFileName) => {
        if (!iconFileName) {
            return '';
        }
        return [this.trimSlashesFromEnd(iconPath), iconFileName]
            .filter(v => v)
            .join('/');
    }

    // TODO: Move to d2-utilizr?
    trimSlashesFromEnd = string => string.replace(/\/+?$/, '')

    closeOptions = () => {
        this.setState({
            showIconOptions: false,
        });
    }

    currentIconClicked = (event) => {
        this.setState({
            anchorEl: event.currentTarget,
            showIconOptions: true,
        });
    }

    render() {
        const iconOptions = this.props.options
            .map((iconFileName) => {
                const iconSrc = [this.trimSlashesFromEnd(this.props.iconPath), iconFileName].join('/');
                return (
                    <Icon
                        key={iconFileName}
                        iconFileName={iconFileName}
                        iconSrc={iconSrc}
                        onIconClicked={this.onIconSelected}
                    />
                );
            });

        return (
            <div>
                <div className="icon-picker__label-text" style={styles.iconPickerLabel}>
                    {this.props.labelText}
                </div>
                <Icon
                    iconSrc={this.getIconSrc(this.props.iconPath, this.state.currentIconFileName)}
                    onIconClicked={this.currentIconClicked}
                />
                <Popover
                    open={this.state.showIconOptions}
                    anchorEl={this.state.anchorEl}
                    onRequestClose={this.closeOptions}
                    style={Object.assign(styles.iconPopoverContent, this.props.iconPopoverStyle)}
                >
                    {iconOptions}
                </Popover>
            </div>
        );
    }
}

IconPicker.propTypes = {
    iconPath: PropTypes.string.isRequired,
    iconFileName: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    labelText: PropTypes.string,
    onChange: PropTypes.func,
    iconPopoverStyle: PropTypes.object,
};

IconPicker.defaultProps = {
    iconFileName: '',
    labelText: 'Icon picker',
    onChange: () => {},
    iconPopoverStyle: {},
};

export default IconPicker;
