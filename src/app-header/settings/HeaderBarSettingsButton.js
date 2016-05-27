import React, { Component } from 'react';
import IconButton from 'material-ui/lib/icon-button';
import SettingsIcon from 'material-ui/lib/svg-icons/action/settings';
import HeaderBarSettingsDialog from './HeaderBarSettingsDialog';
import { white } from 'material-ui/lib/styles/colors';

export default class HeaderBarSettingsButton extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            open: false,
        };

        this._onSettingsPaneToggle = this._onSettingsPaneToggle.bind(this);
    }

    render() {
        return (
            <div>
                <IconButton onClick={this._onSettingsPaneToggle}><SettingsIcon color={white} /></IconButton>
                <HeaderBarSettingsDialog open={this.state.open} onRequestClose={this._onSettingsPaneToggle} />
            </div>
        );
    }

    _onSettingsPaneToggle() {
        this.setState({
            open: !this.state.open,
        });
    }
}
