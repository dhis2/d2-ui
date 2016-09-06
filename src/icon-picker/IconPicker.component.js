import React from 'react';
import Popover from 'material-ui/Popover/Popover';
import IconOption from './IconOption.component';
import CurrentIcon from './CurrentIcon.component';

// TODO: Move to d2-utilizr?
function trimSlashesFromEnd(string) {
    return string.replace(/\/+?$/, '');
}

function getImgSrc(imgPath, imgFileName) {
    if (!imgFileName) {
        return '';
    }
    return [trimSlashesFromEnd(imgPath), imgFileName]
        .filter(v => v)
        .join('/');
}
class IconPicker extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            showOptions: false,
        };

        this._currentIconClicked = this._currentIconClicked.bind(this);
        this._closeOptions = this._closeOptions.bind(this);
        this._onIconSelected = this._onIconSelected.bind(this);
    }

    render() {
        const styles = {
            iconPopover: {
                paddingTop: '1rem',
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

        const optionElements = this.props.options
            .map((option, index) => {
                const optionProps = {
                    value: option,
                    imgSrc: [trimSlashesFromEnd(this.props.imgPath), option].join('/'),
                };

                return (
                    <IconOption key={index} {...optionProps} onIconClicked={this._onIconSelected} />
                );
            });

        return (
            <div>
                <div className="icon-picker__label-text" style={styles.iconPickerLabel}>{this.props.labelText}</div>
                <CurrentIcon imgSrc={getImgSrc(this.props.imgPath, this.props.value)} onIconClicked={this._currentIconClicked} />
                <Popover
                    open={this.state.showOptions}
                    anchorEl={this.state.anchorEl}
                    onRequestClose={this._closeOptions}
                    style={Object.assign(styles.iconPopover, this.props.iconPopoverStyle)}
                >
                    {optionElements}
                </Popover>
            </div>
        );
    }

    _currentIconClicked(event) {
        this.setState({
            anchorEl: event.currentTarget,
            showOptions: !this.state.showOptions,
        });
    }

    _closeOptions() {
        this.setState({
            showOptions: false,
        });
    }

    _onIconSelected(event, value) {
        this.setState({
            showOptions: false,
        }, () => {
            this.props.onChange(value);
        });
    }
}

IconPicker.propTypes = {
    imgPath: React.PropTypes.string,
    options: React.PropTypes.array,
    labelText: React.PropTypes.string,
    onChange: React.PropTypes.func,
    value: React.PropTypes.any,
    iconPopoverStyle: React.PropTypes.object,
};

IconPicker.defaultProps = {
    imgPath: '',
    options: [],
    labelText: 'Icon picker',
    onChange: () => {},
};

export default IconPicker;
