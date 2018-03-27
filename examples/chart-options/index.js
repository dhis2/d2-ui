import React, { Component } from 'react';
import { render } from 'react-dom';
// import { store } from './Store';
// import { Provider } from 'react-redux';

import ChartOptions from '../../src/chart-options/ChartOptions';

class ChartOptionExample extends Component {
    state = {
        activeTab: 0,
        tabContent: {
            axes: {},
            checkbox: {},
            data: {},
        },
    };
    handleAxesContentChange = () => {
        console.log(' ## HANDLE AXES CHANGE ');
    };
    handleCheckBoxChange = () => {
        console.log(' ## HANDLE CHECKBOX CHANGE ');
    };
    handleDataContentChange = () => {
        console.log(' ## HANDLE DATA CHANGE ');
    };
    handleTabChange = () => {
        console.log(' ## HANDLE TAB CHANGE ');
    }
    render = () => (
        <ChartOptions
            activeTab={this.state.activeTab}
            tabContent={this.state.tabContent}
            handleAxesContentChange={this.handleAxesContentChange}
            handleCheckBoxChange={this.handleCheckBoxChange}
            handleDataContentChange={this.handleDataContentChange}
            handleTabChange={this.handleTabChange}
        />
    );
}
render(<ChartOptionExample />, document.getElementById('chart-options'));
