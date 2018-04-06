import React, { Component } from 'react';
import { render } from 'react-dom';
import ChartOptions from '../../src/chart-options/ChartOptions';

class ChartOptionsExample extends Component {
    state = {
        activeTab: 0,
        optionsValues: {},
    };
    handleTabChange = (tabIndex) => {
        this.setState({ activeTab: tabIndex });
    };
    handleOptionsChange = (content, value) => {
        this.setState({
            ...this.state,
            optionsValues: {
                ...this.state.optionsValues,
                [content]: value,
            },
        });
    };
    render = () => (
        <ChartOptions
            activeTab={this.state.activeTab}
            onTabChange={this.handleTabChange}
            optionsValues={this.state.optionsValues}
            onOptionsChange={this.handleOptionsChange}
        />
    );
}
render(<ChartOptionsExample />, document.getElementById('chart-options'));
