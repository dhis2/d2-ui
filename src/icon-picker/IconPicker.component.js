import React from 'react';
import Popover from 'material-ui/lib/popover/popover';
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
                <div className="icon-picker__label-text">{this.props.labelText}</div>
                <CurrentIcon imgSrc={getImgSrc(this.props.imgPath, this.props.value)} onIconClicked={this._currentIconClicked} />
                <Popover open={this.state.showOptions} anchorEl={this.state.anchorEl} onRequestClose={this._closeOptions}>
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
};

IconPicker.defaultProps = {
    imgPath: '',
    options: [],
    labelText: 'Icon picker',
    onChange: () => {},
};

export default IconPicker;
